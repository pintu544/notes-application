# Notes Application - MERN Stack

## Overview

A full-stack notes management application built with the MERN (MongoDB, Express.js, React.js, Node.js) stack, following Model-View-Controller architecture and implementing security best practices.

## Features

### Core Functionality

- **Complete Note Management**: Create, read, update, and delete notes
- **Note Structure**:
  - Title (required)
  - Content (optional)
  - Creation and modification timestamps
  - Category assignment for organization

### Technical Architecture

#### Backend (Node.js & Express)

- **MVC Architecture**:
  - Models: Mongoose schemas for users and notes
  - Controllers: Logic for CRUD operations and user authentication
  - Routes: RESTful API endpoints
- **Authentication**: JWT-based with bcrypt password hashing
- **Data Validation**: Input validation and sanitization

#### Database

- **MongoDB**: NoSQL database for users and notes storage

#### Frontend (React.js)

- **Key Pages**:
  - Authentication (Login/Register)
  - Notes Dashboard with search capabilities
  - User Profile management
- **UI Framework**: Bootstrap or Tailwind CSS for responsive design

#### Security Implementation

- JWT middleware for route protection
- Helmet.js for secure HTTP headers
- CORS configuration for approved origins

## Getting Started

### Prerequisites

- Node.js (v14.x or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/pintu544/notes-application.git
cd notes-application
```

#### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file with the following variables
# Copy these lines to your .env file
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb://localhost:27017/notes_app
JWT_SECRET=jwt_secret_key

# Start the backend server
npm run dev
```

#### 3. Frontend Setup

```bash
# Navigate to frontend directory from the project root
cd frontend

# Install dependencies
npm install

# Start the frontend development server
npm start
```

#### 4. Access the Application

- Backend API will be running at: http://localhost:5000
- Frontend will be running at: http://localhost:3000

### Development Notes

- The backend server uses Nodemon for hot-reloading
- MongoDB should be running locally or accessible via the provided MONGO_URI
- JWT token expiration is set to 24 hours by default

## Enhancement Opportunities

- Real-time note updates using WebSockets or polling
- Category-based note filtering system
- Dark/Light theme toggle
