# Store Management System

This is a full-stack web application for managing store products.
I built this project as part of a home assignment, using React for the frontend and Node.js for the backend.

## Tech Stack

- Frontend: React (Vite), Material UI (MUI), React Hook Form, Axios.
- Backend: Node.js, Express.
- Database: MongoDB, Mongoose.

## How to Run the Project

Since the project is separated into a client and a server, you need to install and run them in two different terminals.

### 1. Backend (Server)

First, navigate to the backend folder and install the dependencies:

cd backend
npm install

Note regarding the Database:
I have included the .env file inside the backend folder. It contains the connection string to the MongoDB Atlas cluster.
The cluster is configured to allow access from any IP address (0.0.0.0/0), so you should be able to connect immediately without any configuration.

To start the server:

npm start

The server will run on http://localhost:3000.

for getting all the products: http://localhost:3000/api/products

### 2. Frontend (Client)

Open a new terminal, navigate to the frontend folder and install the dependencies:

cd frontend
npm install

To start the React application:

npm run dev

The application will open at http://localhost:5173.

## Features

- Create, Read, Update, and Delete (CRUD) products.
- Real-time search filter by product name.
- Category filtering (combined with search).
- Input validation on both client and server sides.
- Dark Mode / Light Mode support.
- Full RTL (Right-to-Left) layout support for Hebrew.
- Toast notifications for user actions (success/error).
- Optimization to prevent unnecessary server requests (save button disabled if no changes were made).

## Database Verification

If you wish to verify that data is actually being saved, you can use the connection string found in backend/.env to connect via MongoDB Compass.
