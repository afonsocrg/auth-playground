import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";
import ReactDOM from "react-dom/client";
import { Helmet, HelmetProvider } from "react-helmet-async";
import App from "./App";

import { displayName } from "@package";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <HelmetProvider>
      <Helmet>
        <title>{displayName}</title>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </Helmet>

      <App />
    </HelmetProvider>
  </React.StrictMode>
);
