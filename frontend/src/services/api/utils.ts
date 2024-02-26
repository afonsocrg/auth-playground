import { refreshToken } from "./auth";

export type Options = {
  refresh?: boolean;
};
export async function requestWrapper(
  fn: () => Promise<Response>,
  { refresh = true }: Options = {}
) {
  try {
    console.log("Wrapping fn call");
    const response = await fn();
    console.log("Got success response");
    return response;
  } catch (error) {
    const response = error.response;
    console.log("Got error");
    console.log(response);
    if (response.status === 401 && refresh) {
      console.log("Refreshing token");
      await refreshToken();
      console.log("Refreshing token");
      return await requestWrapper(fn, { refresh: false });
    }
    throw error;
  }
}
