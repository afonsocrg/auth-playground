import { Location } from "react-router-dom";

export function getUrlFromLocation(location: Location) {
  let result = location.pathname;
  if (location.search) {
    result += location.search;
  }
  if (location.hash) {
    result == location.hash;
  }
  return result;
}
