Overview
This backend service provides the necessary APIs to support the functionality of our stock information dashboard application. It handles user authentication, user registration, and managing user wishlists.

Design Choices

Technology Stack

Node.js: Chosen for its non-blocking, event-driven architecture, which is well-suited for handling asynchronous operations such as database queries and API requests.
Express.js: Used as the web application framework for Node.js to simplify routing, middleware integration, and handling HTTP requests.
MongoDB: Selected as the database to store user information and wishlists due to its flexibility, scalability, and compatibility with Node.js.

Folder Structure
controllers: Contains modules responsible for handling HTTP requests, processing data, and sending responses.
models: Defines the structure of the data stored in the MongoDB database.
routes: Defines the API endpoints and maps them to the corresponding controller functions.


Implementation Details
User Authentication
Login: Implemented using a POST request to /api/auth/login, where the user provides their email and password. The backend verifies the credentials against the stored user data in the database.
Signup: Handled via a POST request to /api/auth/signup, where the user submits their email and password. The backend securely hashes the password using bcrypt before storing it in the database.
User Wishlist
Create or Update Wishlist: Achieved through a POST request to /api/wishlist, where the user adds or updates stocks in their wishlist. The backend validates the request, retrieves the user's wishlist from the database, and updates it accordingly.
Get User Wishlist: Implemented with a GET request to /api/wishlist/:userId, where the backend retrieves the user's wishlist based on their user ID.

Local Development
Clone the repository: git clone 
Install dependencies: npm install
Set up environment variables (e.g., MongoDB connection URI, JWT secret key) in a .env file.
Start the development server: npm start

API Documentation
Authentication Endpoints
POST /api/auth/login
Request body: { "email": "<user-email>", "password": "<user-password>" }
POST /api/auth/signup
Request body: { "email": "<user-email>", "password": "<user-password>" }
Response: { "message": "Signup successful", "user": { "email": "<user-email>", "createdAt": "<signup-date>" } }
Wishlist Endpoints
POST /api/wishlist
Request body: { "userId": "<user-id>", "stockSymbol": "<stock-symbol>", "latestTimeSeriesData": { "1. open": "<open-price>", "2. high": "<high-price>", "3. low": "<low-price>", "4. close": "<close-price>", "5. volume": "<volume>" } }
Response: { "message": "Wishlist updated successfully", "wishlist": { "userId": "<user-id>", "stocks": [{ "stockSymbol": "<stock-symbol>", "latestTimeSeriesData": { "1. open": "<open-price>", "2. high": "<high-price>", "3. low": "<low-price>", "4. close": "<close-price>", "5. volume": "<volume>" } }] } }
GET /api/wishlist/:userId
Response: { "message": "Wishlist retrieved successfully", "wishlist": { "userId": "<user-id>", "stocks": [{ "stockSymbol": "<stock-symbol>", "latestTimeSeriesData": { "1. open": "<open-price>", "2. high": "<high-price>", "3. low": "<low-price>", "4. close": "<close-price>", "5. volume": "<volume>" } }] } }