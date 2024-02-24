import axios from "axios";
import { User } from "@services/api";
import { InvalidCredentialsError, UnhandledError } from "./errors";

const BASE_URL = "http://localhost:8787";

export async function register(
  email: string,
  username: string,
  password: string
) {
  const data = { email, username, password };
  const response = await axios.post(`${BASE_URL}/auth/register`, data);
  console.log(response);
}

export async function login(username: string, password: string): Promise<User> {
  const data = { username, password };
  try {
    const response = await axios.post(`${BASE_URL}/auth/login`, data, {
      withCredentials: true,
    });
    return response.data.data;
  } catch (error) {
    const response = error.response;
    if (response.status === 401) {
      throw new InvalidCredentialsError();
    }
    throw new UnhandledError();
  }
}

export async function logout() {
  try {
    console.log("Logging out")
    console.log("")
    await axios.post(`${BASE_URL}/auth/logout`, null, {
      withCredentials: true,
    });
  } catch (error) {
    throw new UnhandledError();
  }
}
