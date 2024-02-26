import { useNavigate } from "react-router-dom";
import { refreshToken } from "./auth";
import { AuthenticationError } from "./errors";
import { useAuth } from "@hooks/AuthContext";

export type Options = {
  refresh?: boolean;
};
export async function refreshWrapper<ReturnType>(
  fn: () => Promise<ReturnType>,
  { refresh = true }: Options = {}
) {
  try {
    return await fn();
  } catch (error) {
    if (refresh && error.response.status === 401) {
      await refreshToken();
      return await fn();
    }
    throw error;
  }
}

export function useApi() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  /**
   * Fetches data from the API, handling access token refreshing and error handling.
   * If the access token needs refreshing and the refresh fails, it redirects to the login page.
   *
   * @template ReturnType The type of the data returned from the API.
   * @param {Function} fn The API function to call.
   * @returns {Promise<ReturnType>} A promise that resolves with the data fetched from the API.
   * @throws {ApiError} If an error occurs during the API call or access token refreshing.
   *
   * @example
   * const todos = await fetch(api.getTodos);
   * const newTodo = await fetch(() => api.addTodo('new Todo'));
   */
  async function fetch<ReturnType>(fn: () => Promise<ReturnType>) {
    try {
      const response = await refreshWrapper<ReturnType>(fn);
      return response;
    } catch (error) {
      if (error instanceof AuthenticationError) {
        logout();
        navigate("/login");
        return;
      }
      throw error;
    }
  }

  return { fetch };
}
