import "./styles.css";
import { Menu } from "antd";
import { FileOutlined, LoginOutlined } from "@ant-design/icons";
import { useAuth } from "@hooks/AuthContext";
import * as api from "@services/api";
import {
  CheckSquareOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { API_BASE_URL } from "@services/api/consts";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const commonNavbar = [
    {
      key: "docs",
      label: (
        <Link to={`${API_BASE_URL}/docs`} target="_blank">
          API Docs
        </Link>
      ),
      icon: <FileOutlined />,
    },
  ];
  const authNavbar = [
    {
      key: "todos",
      label: <Link to="/todos">To-Do List</Link>,
      icon: <CheckSquareOutlined />,
    },
    {
      icon: <UserOutlined />,
      children: [
        {
          key: "profile",
          label: <Link to="profile">Profile</Link>,
          icon: <UserOutlined />,
        },
        {
          key: "logout",
          label: "Log Out",
          icon: <LogoutOutlined />,
          onClick: async () => {
            try {
              await api.logout();
            } catch (error) {
              console.log(error);
            }
            logout();
            navigate("/");
          },
        },
      ],
    },
  ];
  const guestNavbar = [
    {
      key: "login",
      label: <Link to="/login">Log In</Link>,
      icon: <LoginOutlined />,
    },
  ];
  const items = [
    ...commonNavbar,
    ...(isAuthenticated ? authNavbar : guestNavbar),
  ];

  // This is a hack to allow to specify the onClick on each menu child
  const getItem = (items, key) => {
    // Recursively looks for the first menu item with the given key
    // Returns the item, or null if not found
    for (const item of items) {
      if (item.key === key) return item;
      if (item.children !== undefined) {
        let result = getItem(item.children, key);
        if (result !== null) return result;
      }
    }
    return null;
  };

  return (
    <div className="navbar">
      <Link to="/">
        <div className="home">
          <img src="logo.svg" />
        </div>
      </Link>
      <Menu
        className="menu"
        theme="dark"
        mode="horizontal"
        items={items}
        selectedKeys={[]}
      />
    </div>
  );
}
