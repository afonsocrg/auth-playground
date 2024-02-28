import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { API_BASE_URL } from "@services/api/consts";

export default function ApiDocs() {
  return <SwaggerUI url={`${API_BASE_URL}/openapi.json`} />;
}
