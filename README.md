# Server Application

## Description
This application serves as a robust backend solution, utilizing a plethora of modern technologies to streamline server-side operations, data modeling, and secure authentication procedures. Express.js is leveraged for server-side logic, Mongoose is used for data modeling with MongoDB, and Passport.js, in conjunction with JSON Web Tokens, facilitates secure authentication processes. This comprehensive backend solution provides functionalities such as user registration, login, and session management.

## Version
The current version of the server application is 1.0.0.

## Setup and Installation

To setup and run the project, follow these steps:

1. Clone the repository.
2. Navigate to the project directory.
3. Run `npm install` to install the project dependencies listed in the package.json file.

## Scripts

To start the server, use the command `npm start` which triggers `nodemon server.js`.

Testing is not currently specified for this application.

## Dependencies

This application utilizes the following npm packages:

- **bcrypt**: For data encryption.
- **body-parser**: For parsing incoming request bodies.
- **connect-flash**: For flashing session messages.
- **connect-mongodb-session**: For MongoDB session store with Connect and Express.
- **dotenv**: To load environment variables from a .env file into process.env.
- **express**: A minimal and flexible Node.js web application framework.
- **express-session**: Simple session middleware for Express.
- **express-validator**: An express.js middleware for validator.
- **http-errors**: Create HTTP error objects.
- **joi**: Object schema validation.
- **jsonwebtoken**: Implementation of JSON Web Tokens.
- **mongoose**: A MongoDB object modeling tool.
- **morgan**: HTTP request logger middleware for node.js.
- **nodemailer**: To send emails from Node.js.
- **passport**: Authentication middleware for Node.js.
- **passport-local**: Local username and password authentication strategy for Passport.
- **socket.io**: Real-time bidirectional event-based communication.


## Contribution

Contributions and suggestions are welcome. Please feel free to open an issue or create a pull request.
