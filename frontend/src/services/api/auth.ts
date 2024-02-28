import axios, { AxiosError } from "axios";
import { User } from "@services/api";
import {
  AuthenticationError,
  InvalidCredentialsError,
  RegistrationError,
  UnhandledError,
} from "./errors";
import { API_BASE_URL } from "./consts";

export async function register(
  email: string,
  username: string,
  password: string,
  terms_and_conditions
): Promise<User> {
  const data = { email, username, password, terms_and_conditions };
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    const response = error.response;
    if (response.status === 400 && response.data?.error) {
      throw new RegistrationError(response.data.error);
    }
    throw new UnhandledError(error.message);
  }
}

export async function login(username: string, password: string): Promise<User> {
  const data = { username, password };
  console.log("Logging in to ", `${API_BASE_URL}/auth/login`);
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, data, {
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
    await axios.post(`${API_BASE_URL}/auth/logout`, null, {
      withCredentials: true,
    });
  } catch (error) {
    throw new UnhandledError();
  }
}

export async function refreshToken() {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/refresh`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      const response = error.response;
      if (response.status === 401) {
        throw new AuthenticationError();
      }
    }
    throw error;
  }
}
