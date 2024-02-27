import axios, { AxiosError } from "axios";
import { BASE_URL } from "./consts";
import { InvalidDataError } from "./errors";

export type Profile = {
  id: number;
  username: string;
  email: string;
};

export async function getProfile(): Promise<Profile> {
  const response = await axios.get(`${BASE_URL}/api/profile`, {
    withCredentials: true,
  });
  return response.data.result.user;
}

export async function editProfile({
  username,
  email,
}: {
  username?: string;
  email?: string;
}): Promise<Profile> {
  try {
    const response = await axios.put(
      `${BASE_URL}/api/profile`,
      { username, email },
      { withCredentials: true }
    );
    return response.data.result.user;
  } catch (error) {
    if (error instanceof AxiosError) {
      const response = error.response;
      if (response.status === 400) {
        throw new InvalidDataError(response.data.error);
      }
    }
    throw error;
  }
}

export async function deleteProfile(): Promise<void> {
  const response = await axios.delete(`${BASE_URL}/api/profile`, {
    withCredentials: true,
  });
  return;
}
