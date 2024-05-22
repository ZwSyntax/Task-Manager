# Taskmaster - A MERN Stack Task Management Web App

![Taskmaster](https://res.cloudinary.com/dqone7ala/image/upload/v1716348976/Screenshot_2024-05-22_060247_fz8rbe.png)

## Project Description

Taskmaster is a full-stack web application designed to help users manage their tasks efficiently. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), this application allows users to register, login, create, update, delete, and mark tasks as completed. Additionally, users can filter tasks by their status (completed or pending) and search for tasks by name.

## Features

- User Registration and Login
- Create, Update, and Delete Tasks
- Mark Tasks as Completed
- Filter Tasks by Status (Completed, Pending)
- Search Tasks by Name
- Responsive and User-Friendly Interface
- JWT Authentication

## Live Demo

Check out the live demo: [Taskmaster Live Demo](https://taskmasterashuvra.netlify.app/)

## Local Installation Guide

Follow these steps to set up the project locally:

### Clone the Repository

1. Clone the repository:
   ```bash
   git clone https://github.com/shuvra-matrix/Task-Manager-MERN.git
   cd Task-Manager-MERN
   ```

### Front-end

1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Back-end

1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the server directory with the following variables:

```
MONGO_USER=your_mongodb_user
MONGO_PASS=your_mongodb_password
JWT_SECRET=your_jwt_secret
COOKIE_DOMAIN=localhost_or_your_server_domain
ISPRODUCTION=false_or_true
COOKIE_EXPIRE=86400000
```

Create a `.env.local` file in the client directory with the following variable:

```
VITE_SERVER_URL=your_server_url
```

## Docker Installation Guide

To run the project using Docker, follow these steps:

1. Ensure you have Docker and Docker Compose installed on your machine.
2. In the root directory of the project, run the following command:
   ```bash
   docker-compose -f ./docker-compose.yaml up
   ```
3. Docker will build the images and start the containers for both the client and server.

## Contribution

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository.
2. Create a new branch with a descriptive name.
3. Make your changes and commit them with clear and concise messages.
4. Push your changes to your forked repository.
5. Create a pull request to the main repository.

## Issues

If you encounter any issues or have any feature requests, please create an issue in the [Issues](https://github.com/shuvra-matrix/Task-Manager-MERN/issues) section of the repository.
