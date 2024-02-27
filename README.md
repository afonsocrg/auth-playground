# Toy To Do App: Authentication Playground

This Toy To Do app serves as a proof of concept for exploring various aspects of user authentication and account management. The primary goal of this project is to provide a playground environment where developers can experiment with different authentication flows, token management strategies, and user account functionalities.

## TODO
 - validate username and email when registering
 - Cannot log in if user already logged in
 - Clear login fields when invalid credentials
 - Pagination
 - Filters
 - Recover password
 - oAuth
 - GDPR

## Features

- **User Registration**: Users can sign up for a new account by providing necessary information such as username, email, and password.
- **User Authentication**: Registered users can log in securely using their credentials.
- **Token Management**: Implementation of access token expiration and refresh mechanism to ensure secure authentication.
- **To Do Management**: Users can create, delete, and edit their to-do tasks.
- **Account Deletion**: Capability for users to delete their accounts and associated data.
- **Password Recovery**: Option for users to recover their passwords in case they forget them.

## Purpose

The purpose of this Toy To Do app is multifold:

1. **Proof of Concept**: It serves as a proof of concept for implementing authentication mechanisms within an application.
2. **Learning Playground**: Developers can utilize this project to understand and experiment with various authentication flows, including login/logout, token expiration, refresh tokens, etc.
3. **Security Exploration**: Provides a platform to explore security best practices related to authentication and user account management.
4. **API Integration Practice**: Developers can practice integrating authentication features into both frontend and backend applications.
5. **Conceptual Understanding**: Helps in gaining a deeper understanding of the concepts involved in user authentication and authorization.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine.
   ```bash
   git clone git@github.com:afonsocrg/auth-playground.git
   ```

2. **Install Dependencies**: Navigate to the project directory and install dependencies.
   ```bash
   cd auth-playground
   bun i
   ```

3. **Set Up Environment Variables**: Set up necessary environment variables for database connection, JWT secret, etc.
   ```bash
   cp .env.example .env
   ```

4. **Run the Application**: Start the application and begin experimenting with the authentication features.
   ```bash
   npm start
   ```

## Contributions

Contributions to this project are welcomed. Whether it's fixing bugs, adding new features, or improving documentation, feel free to submit pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/afonsocrg/auth-playground/blob/main/LICENSE) file for details.

## Disclaimer

This project is intended for educational and experimental purposes only. It may not be suitable for production environments without extensive security review and enhancements. Always follow security best practices when implementing authentication and user management systems.