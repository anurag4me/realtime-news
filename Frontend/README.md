# Frontend - Real-Time News Feed App

A React-based frontend application that displays real-time news updates using Redux for state management and Socket.IO for real-time communication.

## Features

- Real-time news updates
- Category-based news filtering
- Multiple news sources (internal, external, and trending)
- Responsive design with Tailwind CSS
- Redux state management
- WebSocket integration for live updates

## Tech Stack

- **React** - UI library 
- **Redux Toolkit** - State management
- **Socket.IO** - Real-time communication
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   cd Frontend
   ```

2. Install dependencies:
    ```
    npm install
    ```

3. Create a `.env` file in the Frontend directory:
    ```
    VITE_NEWS_API_KEY=your_news_api_key
    ```

4. Start the development server:
    ```
    npm run dev
    ```

## Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Development
The app uses Vite's development server with HMR (Hot Module Replacement). The development server will start at `http://localhost:5173`.

## API Configuration
The app is configured to proxy API requests to the backend server:
```
// vite.config.js
export default defineConfig({
server: {
    proxy: {
    '/api': 'http://localhost:5000'
    }
}
})
```

## Environment Variables
Required environment variables:
```
`VITE_NEWS_API_KEY` - API key for external news service
```

## State Management
Redux is used for state management with the following main slices:
```
`newsSlice` - Manages news data, categories, and async actions
```

## WebSocket Integration
Socket.IO client is configured to connect to the backend server for real-time updates:
```
import { io } from 'socket.io-client';
const socket = io('http://localhost:5000');
```

## Building for Production
To create a production build:
```
npm run build
```
The build artifacts will be stored in the `dist/` directory.

## ESLint Configuration
The project uses ESLint for code quality. Configuration can be found in `eslint.config.js`.

## Dependencies
Main Dependencies
- `react` - UI framework
- `@reduxjs/toolkit` - State management
- `socket.io-client` - WebSocket client
- `axios` - HTTP client
- `tailwindcss` - CSS framework

Development Dependencies
- `vite` - Build tool
- `eslint` - Code linting
- `@vitejs/plugin-react` - React support for Vite


