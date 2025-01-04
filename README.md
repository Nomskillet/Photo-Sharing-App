Photo Sharing App

Overview

The Photo Sharing App is a full-stack web application that allows users to register, log in, upload photos, view uploaded photos, and delete them. It utilizes a React frontend, a Node.js/Express backend, and a PostgreSQL database for data storage. The application is designed to be user-friendly and efficient, supporting secure authentication and image management.

Features

User Registration and Authentication: Users can create accounts and log in securely using JWT authentication.

Photo Uploading: Upload photos with titles and descriptions.

Photo Gallery: View a gallery of all uploaded photos.

Delete Photos: Remove photos from the gallery and the server.

Responsive Design: Optimized for desktop and mobile viewing.

Tech Stack

Frontend: React, Tailwind CSS

Backend: Node.js, Express

Database: PostgreSQL (hosted on Render)

Hosting:

Frontend: Netlify

Backend: Render

Getting Started

Prerequisites

Ensure you have the following installed:

Node.js

Yarn (or npm)

PostgreSQL

Installation

Clone the repository:

git clone https://github.com/<your-username>/Photo-Sharing-App.git

Navigate to the project directory:

cd Photo-Sharing-App

Backend Setup

Navigate to the backend folder:

cd backend

Install dependencies:

yarn install

Configure the environment variables:
Create a .env file in the backend directory with the following:

DATABASE_URL=postgresql://<your-database-credentials>
NODE_ENV=production
JWT_SECRET=<your-jwt-secret>

Run database migrations:

npx sequelize-cli db:migrate

Start the backend server:

yarn start

The server will run on http://localhost:5001 by default.

Frontend Setup

Navigate to the frontend folder:

cd ../frontend

Install dependencies:

yarn install

Configure the environment variables:
Create a .env file in the frontend directory with the following:

REACT_APP_BACKEND_URL=https://<your-backend-url>

Start the frontend development server:

yarn start

The app will run on http://localhost:3000 by default.

Deployment

Backend Deployment

Deploy the backend on Render.

Link your GitHub repository to Render.

Set the required environment variables in Render's settings (DATABASE_URL, NODE_ENV, JWT_SECRET).

Start the service, and note the deployed backend URL.

Frontend Deployment

Deploy the frontend on Netlify.

Link your GitHub repository to Netlify.

Set the REACT_APP_BACKEND_URL environment variable to the deployed backend URL.

Trigger a build and deploy the application.

Usage

Register: Create an account using the registration form.

Log In: Use your credentials to log in.

Upload Photos: Add a title, description, and choose a file to upload.

View Gallery: Browse all uploaded photos.

Delete Photos: Remove any unwanted photos.

Troubleshooting

Mixed Content Issues: Ensure the backend URL uses HTTPS to avoid insecure content errors.

Database Connection Errors: Verify the DATABASE_URL and ensure the database is running and accessible.

Environment Variable Issues: Confirm all required environment variables are correctly set in both backend and frontend.

Contributing

Feel free to submit issues or pull requests for new features or bug fixes.

License

This project is licensed under the MIT License.

Happy sharing!
