# Backend - Real-Time News Feed App

This is a full-stack news application where users can view news items based on categories and get real-time updates when new news is posted. The backend is built using Express, Socket.IO for real-time communication, and MongoDB for data storage.


## Install Dependencies

1. Clone this repository to your local machine:
   ```
   git clone <repo_url>
   ```

2. Navigate to the Backend/ directory:
    ```
    cd Backend
    ```

3. Install the required dependencies::
    ```
    npm install
    ```

4. Create a .env file in the Backend/ folder with the following environment variables:
    ```ini
    MONGO_URI=<your_mongo_db_connection_string>
    NEWS_API_KEY=<your_news_api_key>
    ```

## Start the Server

1. Start the backend server:
    ```
    npm start
    ```

2. Alternatively, you can use `nodemon` for live reloading during development:
    ```
    npm install -g nodemon
    nodemon index.js
    ```

## API Endpoints

 News Routes

- GET /api/news/trending
    - Fetches the latest trending news.

- POST /api/news
    - Adds a new news item.
    - Request Body: 
    ```json
    {
    "title": "New News Title",
    "content": "News content goes here",
    "category": "category_name"
    }
    ```

## Real-Time Features

- `Subscribe to a Category:` Clients can subscribe to a specific category using the subscribe event via Socket.IO. Once subscribed, the client will receive real-time news updates for that category.

- `Broadcast New News:` When a new news item is added, it is broadcast to all clients subscribed to the corresponding category.

## Dependencies
- `Express:` Web framework for building the API.

- `Socket.IO:` Enables real-time communication between the server and clients.

- `Mongoose:` ODM for MongoDB.

- `dotenv:` Loads environment variables from .env files.

- `cors:` Enables Cross-Origin Resource Sharing.

