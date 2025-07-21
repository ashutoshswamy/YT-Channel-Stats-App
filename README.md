# YouTube Channel Stats App

A simple React web app to fetch and display YouTube channel statistics (subscribers, total views, and video count) by channel name or ID.

## Features

- Search YouTube channels by name or channel ID
- Displays subscriber count, total views, and video count
- Responsive, modern UI with dark mode styling
- Error handling for invalid input or network issues
- Social links for the developer

## Demo

![App Screenshot](./assets/Screenshot%202025-07-21%20at%206.30.03 PM.png)
![App Screenshot](./assets/Screenshot%202025-07-21%20at%206.30.30 PM.png)

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/ashutoshswamy/YT-Channel-Stats-App.git
   cd yt-channel-stats-app
   ```

2. **Install dependencies:**

   ```sh
   npm install
   ```

3. **Set up your YouTube Data API key:**

   - Create a `.env` file in the root directory:

     ```
     REACT_APP_YOUTUBE_API_KEY=YOUR_YOUTUBE_API_KEY
     ```

   - Replace `YOUR_YOUTUBE_API_KEY` with your actual API key.

4. **Start the development server:**
   ```sh
   npm start
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

- Enter a YouTube channel name (e.g., `MrBeast`) or channel ID (e.g., `UCX6OQ3DkcsbYNE6H8uQQuVA`) in the input box.
- Click "Get Stats" to view the channel's statistics.

## Available Scripts

In the project directory, you can run:

- `npm start` — Run the app in development mode
- `npm run build` — Build the app for production
- `npm test` — Run tests

## Technologies Used

- [React](https://reactjs.org/)
- [Lucide React Icons](https://lucide.dev/)
- [YouTube Data API v3](https://developers.google.com/youtube/v3)
- [Create React App](https://create-react-app.dev/)

## Developer

Developed by [Ashutosh Swamy](https://github.com/ashutoshswamy)

- [GitHub](https://github.com/ashutoshswamy)
- [LinkedIn](https://linkedin.com/in/ashutoshswamy)
- [Twitter](https://twitter.com/ashutoshswamy_)
- [YouTube](https://youtube.com/@codeitofficial3)
- [Instagram](https://instagram.com/codeitofficial3)

## License

This project is licensed under the MIT License.
