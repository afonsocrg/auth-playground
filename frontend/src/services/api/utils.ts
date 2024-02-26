import { useNavigate } from "react-router-dom";
import { refreshToken } from "./auth";
import { AuthenticationError } from "./errors";

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

  async function fetch<ReturnType>(fn: () => Promise<ReturnType>) {
    try {
      const response = await refreshWrapper<ReturnType>(fn);
      return response;
    } catch (error) {
      if (error instanceof AuthenticationError) {
        navigate("/login");
        return;
      }
      throw error;
    }
  }

  return { fetch };
}
