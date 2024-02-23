import "./styles.css";
import { Menu } from "antd";
import { HomeOutlined, LoginOutlined } from "@ant-design/icons";
import { useAuth } from "@hooks/AuthContext";
import {
  CheckSquareOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const authNavbar = [
    {
      key: "tasks",
      label: <Link to="/tasks">My tasks</Link>,
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
          onClick: () => {
            navigate("/");
            logout();
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
  const items = isAuthenticated ? authNavbar : guestNavbar;

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
        onClick={({ key }) => getItem(items, key)?.onClick?.()}
        selectedKeys={[]}
        // style={{ flex: 1, minWidth: 0 }}
      />
    </div>
  );
}
