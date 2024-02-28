import { BrowserRouter } from "react-router-dom";
import { ConfigProvider, notification } from "antd";

import { AppRoutes } from "./routes";
import Layout from "@pages/Layout";
import Navbar from "@components/Navbar";
import AuthProvider from "@hooks/AuthContext";
import NotificationProvider from "@hooks/NotificationContext";

export default function App() {
  const [api, contextHolder] = notification.useNotification();

  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: { colorPrimary: "#77B255" },
        }}
      >
        <AuthProvider>
          <NotificationProvider api={api}>
            {contextHolder}
            <Layout navBar={<Navbar />} content={<AppRoutes />} />
          </NotificationProvider>
        </AuthProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
}
