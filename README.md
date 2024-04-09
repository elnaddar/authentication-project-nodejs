# Authentication Project in Node.js

This project demonstrates an authentication system built with Node.js, showcasing sessions, `passport-local` for authentication, PostgreSQL for data persistence, and EJS for templating. It's a practical example for those looking to implement a secure and scalable user authentication system in their Node.js applications.

## Features

- **User Authentication**: Implementing `passport-local` strategy for secure login functionalities.
- **Session Management**: Utilizing `express-session` for handling user sessions across web requests.
- **Password Security**: Using `bcrypt` for hashing and securing user passwords.
- **Database Integration**: Connecting to PostgreSQL database for storing user data.
- **Template Rendering**: Serving dynamic HTML content with EJS templating engine.

## Prerequisites

Ensure your development environment includes:

- Node.js (20.10.0 or higher recommended)
- PostgreSQL (16.1 or higher recommended)
- npm (included with Node.js)

## Installation

Start by cloning the repository and installing its dependencies:

```bash
git clone https://github.com/elnaddar/authentication-project-nodejs.git
cd authentication-project-nodejs
npm install
```