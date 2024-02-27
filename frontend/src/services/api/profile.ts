import axios from "axios";
import { BASE_URL } from "./consts";

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
  const response = await axios.put(
    `${BASE_URL}/api/profile`,
    { username, email },
    { withCredentials: true }
  );
  return response.data.result.user;
}

export async function deleteProfile(): Promise<void> {
  const response = await axios.delete(`${BASE_URL}/api/profile`, {
    withCredentials: true,
  });
  return;
}
