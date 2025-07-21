import React, { useState } from "react";
import "./App.css";

// Import Lucide React Icons
import {
  Youtube,
  Search,
  Users,
  Eye,
  Video,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  AlertCircle, // For error message
  Info, // For info text
} from "lucide-react";

// Helper function to format numbers (K, M, B)
const formatNumber = (num) => {
  if (num === null || isNaN(num)) {
    return "N/A";
  }
  if (num >= 1000000000) {
    // Billions
    return (num / 1000000000).toFixed(1).replace(/\.0$/, "") + "B";
  }
  if (num >= 1000000) {
    // Millions
    return (num / 1000000).toFixed(1).replace(/\.0$/, "") + "M";
  }
  if (num >= 1000) {
    // Thousands
    return (num / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return num.toString();
};

function App() {
  const [query, setQuery] = useState("");
  const [subscriberCount, setSubscriberCount] = useState(null);
  const [channelName, setChannelName] = useState("");
  const [totalViews, setTotalViews] = useState(null);
  const [videoCount, setVideoCount] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const YOUTUBE_API_KEY = process.env.REACT_APP_YOUTUBE_API_KEY;

  const fetchChannelData = async (id) => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${id}&key=${YOUTUBE_API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const channelData = data.items[0];
        // Parse numbers to integers first
        const subs = parseInt(channelData.statistics.subscriberCount);
        const views = parseInt(channelData.statistics.viewCount);
        const videos = parseInt(channelData.statistics.videoCount);

        // Set the state with the raw parsed numbers, not formatted yet
        // We'll format them in the JSX
        setSubscriberCount(subs);
        setTotalViews(views);
        setVideoCount(videos);

        setChannelName(channelData.snippet.title);
        return true; // Indicate success
      } else {
        return false; // Indicate channel not found with this ID
      }
    } catch (err) {
      console.error("Error fetching channel data by ID:", err);
      throw new Error("Failed to fetch channel data by ID."); // Re-throw to be caught by the main function
    }
  };

  const handleSearch = async () => {
    if (!query.trim()) {
      setError("Please enter a YouTube channel ID or name.");
      return;
    }

    setLoading(true);
    // Clear all previous stats when a new search starts
    setSubscriberCount(null);
    setChannelName("");
    setTotalViews(null);
    setVideoCount(null);
    setError("");

    try {
      // First, try to fetch directly using the input as a Channel ID
      // YouTube Channel IDs are typically 24 characters long and start with UC.
      const isLikelyChannelId =
        query.trim().length === 24 && query.trim().startsWith("UC");

      if (isLikelyChannelId) {
        const success = await fetchChannelData(query.trim());
        if (success) {
          setLoading(false);
          return; // Successfully found by ID, so we're done
        }
        // If not found by ID, proceed to search by name
      }

      // If not a likely ID, or ID search failed, try searching by name
      const searchResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
          query.trim()
        )}&type=channel&key=${YOUTUBE_API_KEY}`
      );

      if (!searchResponse.ok) {
        throw new Error(`HTTP error! status: ${searchResponse.status}`);
      }

      const searchData = await searchResponse.json();

      if (searchData.items && searchData.items.length > 0) {
        const firstChannelResult = searchData.items.find(
          (item) => item.id.kind === "youtube#channel"
        );
        if (firstChannelResult) {
          await fetchChannelData(firstChannelResult.id.channelId);
        } else {
          setError(
            "No channels found for that name. Please try a different name or a channel ID."
          );
        }
      } else {
        setError(
          "No channels found for that name. Please try a different name or a channel ID."
        );
      }
    } catch (err) {
      console.error("Error during search:", err);
      setError(
        "Failed to fetch data. Please check your input or network connection."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          <Youtube
            size={36}
            color="#ff0000"
            style={{ verticalAlign: "middle", marginRight: "10px" }}
          />
          YouTube Channel Stats
        </h1>
        <div className="input-section">
          <input
            type="text"
            placeholder="Enter Channel ID or Name"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="channel-input"
          />
          <button
            onClick={handleSearch}
            className="fetch-button"
            disabled={loading}
          >
            <Search
              size={20}
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            {loading ? "Searching..." : "Get Stats"}
          </button>
        </div>

        {error && (
          <p className="error-message">
            <AlertCircle
              size={18}
              style={{ verticalAlign: "middle", marginRight: "8px" }}
            />
            {error}
          </p>
        )}

        {/* Display results only if channelName is available (implies other stats are too) */}
        {channelName && (
          <div className="result-section">
            <h2>{channelName}</h2>
            <div className="stats-grid">
              <p className="stat-item">
                <Users size={24} className="stat-icon" />
                Subscribers:{" "}
                <span className="stat-value">
                  {formatNumber(subscriberCount)}
                </span>
              </p>
              <p className="stat-item">
                <Eye size={24} className="stat-icon" />
                Total Views:{" "}
                <span className="stat-value">{formatNumber(totalViews)}</span>
              </p>
              <p className="stat-item">
                <Video size={24} className="stat-icon" />
                Videos:{" "}
                <span className="stat-value">{formatNumber(videoCount)}</span>
              </p>
            </div>
          </div>
        )}

        <p className="info-text">
          <Info
            size={18}
            style={{ verticalAlign: "middle", marginRight: "8px" }}
          />
          Enter a YouTube Channel ID (e.g., `UCX6OQ3DkcsbYNE6H8uQQuVA` for
          PewDiePie) or a channel name (e.g., `MrBeast`).
        </p>

        {/* Developer Info Section */}
        <div className="developer-info">
          <p>Developed by Ashutosh Swamy</p>
          <div className="social-links">
            <a
              href="https://github.com/ashutoshswamy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github size={20} /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/ashutoshswamy"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin size={20} /> LinkedIn
            </a>
            <a
              href="https://twitter.com/ashutoshswamy_"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Twitter size={20} /> Twitter
            </a>
            <a
              href="https://youtube.com/@codeitofficial3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Youtube size={20} /> YouTube
            </a>
            <a
              href="https://instagram.com/codeitofficial3"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Instagram size={20} /> Instagram
            </a>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
