import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import { toast } from "sonner";

import { refreshToken } from "./auth";
import { AuthenticationError } from "./errors";
import { useAuth } from "@hooks/AuthContext";
import { getUrlFromLocation } from "@utils/urls";
import { AxiosError } from "axios";
import { useNotification } from "@hooks/NotificationContext";

export async function refreshWrapper<ReturnType>(
  fn: () => Promise<ReturnType>
) {
  try {
    return await fn();
  } catch (error) {
    if (error instanceof AxiosError && error.response.status === 401) {
      await refreshToken();
      return await fn();
    }

    throw error;
  }
}

export function useApi() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const location = useLocation();
  const { notificationApi } = useNotification();

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
        navigate({
          pathname: "/login",
          search: createSearchParams({
            redirect: getUrlFromLocation(location),
          }).toString(),
        });
        return;
      }
      toast.error(error.message);
      throw error;
    }
  }

  return { fetch };
}
