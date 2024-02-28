# ✅ Auth-Playground: A Toy To-Do App

This toy To-Do app serves as a proof of concept for exploring various aspects of user authentication and account management.
The primary goal of this project is to provide a playground environment where developers can experiment with different authentication flows, token management strategies, and user account functionalities.

This software uses Cloudflare Workers to run the backend, a D1 (SQLite) database, and React in the frontend.

## Features

- **Account Management**: Users can sign up for a new account, manage their personal information, and delete their account;

- **Session Management**: Registered users can log in using their credentials (and eventually a third-party authentication service), and log out. The token expiration and refresh logic is done automatically;

- **Password Recovery**: Option for users to recover their passwords in case they forget them. (Not implemented yet)

## Privacy

All data collected in this platform can only be seen, modified and deleted by its owners. For more information check out our [Privacy Policy](https://auth-playground.afonsocrg.com/privacy_policy) and our [Terms and Conditions](https://auth-playground.afonsocrg.com/terms_and_conditions)

## Running locally

To get started with this project, follow these steps:

1. **Install `bun`**: In this project I'm using bun to manage the node modules and to start the application. Follow the installation instructions found [here](https://bun.sh/docs/cli/install)


1. **Clone the Repository**: Clone this repository to your local machine.

   ```bash
   $ git clone git@github.com:afonsocrg/auth-playground.git
   ```

1. **Install Dependencies**: Navigate to the project directory and install dependencies.

   ```bash
   $ cd auth-playground
   $ bun i
   ```

1. **Setup D1 database**: Following the steps described [here](https://developers.cloudflare.com/d1/get-started/)
 
   * Make sure you have a Cloudflare account. If you don't, you can sign up [here](https://dash.cloudflare.com/sign-up)
   
   * Log-in your wrangler CLI into Cloudflare
   ```bash
   $ cd backend # Make sure you are in the .../backend directory
   $ bun wrangler login
   ```

   * Create a D1 database
   ```bash
   $ bun wrangler d1 create database_name

   ✅ Successfully created DB database_name
   
   [[d1_databases]]
   binding = "DB"
   database_name = "database_name"
   database_id = "<unique-ID-for-your-database>"
   ```

   * Bind your worker to your database, by copying the output of the previous command to your `wrangler.toml` file. Since this repo already contains a `wrangler.toml` file, you just need to update the `database_id` to match the one given by the previous command.

1. **Set Up Environment Variables**: Set up necessary environment variables. For now you shouldn't need to edit the frontend's `.env` file, but check if the server port.

   ```bash
   $ cd ../frontend # Make sure you are in the .../frontend directory
   $ cp .env.example .env
   ```

1. **Run the Application**: Run the backend and frontend from the root directory
   ```bash
   $ cd .. # Make sure you are in the project's root directory
   $ bun start-b
   $ bun start-f
   ```

## Contributions

Contributions to this project are welcomed. Whether it's fixing bugs, adding new features, or improving documentation, feel free to submit pull requests!

## License

This project is licensed under the MIT License - see the [LICENSE](https://github.com/afonsocrg/auth-playground/blob/main/LICENSE) file for details.

## Disclaimer

This project is intended for educational and experimental purposes only. It may not be suitable for production environments without extensive security review and enhancements. Always follow security best practices when implementing authentication and user management systems.
