import { useContext, createContext } from "react";
import { notification } from "antd";

type NotificationProviderType = {
  notificationApi: any;
  contextHolder: any;
};
const NotificationContext = createContext({} as NotificationProviderType);

export default function NotificationProvider({ children }) {
  const [notificationApi, contextHolder] = notification.useNotification();

  notificationApi.error({
    message: "This is a test message",
  });

  return (
    <NotificationContext.Provider value={{ notificationApi, contextHolder }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  return useContext(NotificationContext);
};
