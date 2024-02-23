import "./styles.css";
import { Typography } from "antd";

const { Title, Text } = Typography;

export default function Home() {
  return (
    <>
      <Title>Toy To Do App: Authentication Playground</Title>
      <Text>
        This Toy To Do app serves as a proof of concept for exploring various
        aspects of user authentication and account management. The primary goal
        of this project is to provide a playground environment where developers
        can experiment with different authentication flows, token management
        strategies, and user account functionalities.
      </Text>
      <Title level={2}>Features</Title>
      <ul>
        <li>
          <Text>
            <strong>User Registration</strong>: Users can sign up for a new
            account by providing necessary information such as username, email,
            and password.
          </Text>
        </li>
        <li>
          <Text>
            <strong>User Authentication</strong>: Registered users can log in
            securely using their credentials.
          </Text>
        </li>
        <li>
          <Text>
            <strong>Token Management</strong>: Implementation of access token
            expiration and refresh mechanism to ensure secure authentication.
          </Text>
        </li>
        <li>
          <Text>
            <strong>To Do Management</strong>: Users can create, delete, and
            edit their to-do tasks.
          </Text>
        </li>
        <li>
          <Text>
            <strong>Account Deletion</strong>: Capability for users to delete
            their accounts and associated data.
          </Text>
        </li>
        <li>
          <Text>
            <strong>Password Recovery</strong>: Option for users to recover
            their passwords in case they forget them.
          </Text>
        </li>
      </ul>

      <Title level={2}>Purpose</Title>
      <Text>The purpose of this Toy To Do app is multifold:</Text>

      <ul>
        <li>
          <Text>
            <strong>Proof of Concept</strong>: It serves as a proof of concept
            for implementing authentication mechanisms within an application.
          </Text>
        </li>
        <li>
          <Text>
            <strong>Learning Playground</strong>: Developers can utilize this
            project to understand and experiment with various authentication
            flows, including login/logout, token expiration, refresh tokens,
            etc.
          </Text>
        </li>
        <li>
          <Text>
            <strong>Security Exploration</strong>: Provides a platform to
            explore security best practices related to authentication and user
            account management.
          </Text>
        </li>
        <li>
          <Text>
            <strong>API Integration Practice</strong>: Developers can practice
            integrating authentication features into both frontend and backend
            applications.
          </Text>
        </li>
        <li>
          <Text>
            <strong>Conceptual Understanding</strong>: Helps in gaining a deeper
            understanding of the concepts involved in user authentication and
            authorization.
          </Text>
        </li>
      </ul>
    </>
  );
}
