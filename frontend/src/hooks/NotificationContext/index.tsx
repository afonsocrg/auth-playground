import { NotificationInstance } from "antd/es/notification/interface";
import { useContext, createContext } from "react";

type NotificationProviderType = {
  api: NotificationInstance;
};
const NotificationContext = createContext({} as NotificationProviderType);

// Documentation: https://ant.design/components/notification
export default function NotificationProvider({ api, children }) {
  return (
    <NotificationContext.Provider value={{ api }}>
      {children}
    </NotificationContext.Provider>
  );
}

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined)
    throw new Error(
      "NotificationContext was used outside the NotificationProvider"
    );
  return context;
};
