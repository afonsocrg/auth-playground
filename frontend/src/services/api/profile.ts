import axios from "axios";
import { BASE_URL } from "./consts";

export async function getProfile() {
  const response = await axios.get(`${BASE_URL}/api/profile`, {
    withCredentials: true,
  });
  return response.data.result.user;
}

export async function deleteProfile() {
  const response = await axios.delete(`${BASE_URL}/api/profile`, {
    withCredentials: true,
  });
  return;
}
