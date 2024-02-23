import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { AppRoutes } from "./routes";

import Layout from "@pages/Layout";
import Navbar from "@components/Navbar";
import AuthProvider from "@hooks/AuthContext";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Toaster richColors position="top-right" duration={2500} />
        <Layout navBar={<Navbar />} content={<AppRoutes />} />
      </AuthProvider>
    </BrowserRouter>
  );
}
