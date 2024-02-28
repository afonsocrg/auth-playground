import { useLocation, useNavigate, createSearchParams } from "react-router-dom";
import { useAuth } from "@hooks/AuthContext";
import { getUrlFromLocation } from "@utils/urls";

export default function useTemporaryRedirect() {
  const location = useLocation();

  function temporaryRedirect(to: string) {
    return {
      pathname: to,
      search: createSearchParams({
        redirect: getUrlFromLocation(location),
      }).toString(),
    };
  }

  return { temporaryRedirect };
}
