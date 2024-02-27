import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import { AppRoutes } from "./routes";
import { ConfigProvider } from "antd";

import Layout from "@pages/Layout";
import Navbar from "@components/Navbar";
import AuthProvider from "@hooks/AuthContext";
import NotificationProvider, {
  useNotification,
} from "@hooks/NotificationContext";

export default function App() {
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: { colorPrimary: "#77B255" },
        }}
      >
        <AuthProvider>
          <NotificationProvider>
            {/* <Toaster richColors position="top-right" duration={2500} /> */}
            <Layout navBar={<Navbar />} content={<AppRoutes />} />
          </NotificationProvider>
        </AuthProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}
