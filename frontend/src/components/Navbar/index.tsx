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
  const items = isAuthenticated
    ? [
        {
          key: "tasks",
          label: <Link to="/tasks">My tasks</Link>,
          icon: <CheckSquareOutlined />,
        },
        {
          icon: <UserOutlined />,
          children: [
            {
              key: 'profile',
              label: <Link to='profile'>Profile</Link>,
              icon: <UserOutlined/>
            },
            {
              key: "logout",
              label: (
                <span
                  onClick={() => {
                    console.log("Clicked");
                    navigate("/");
                    logout();
                  }}
                >
                  Log Out
                </span>
              ),
              icon: <LogoutOutlined />,
            },
          ]
        }
      ]
    : [
        {
          key: "login",
          label: <Link to="/login">Log In</Link>,
          icon: <LoginOutlined />,
        },
      ];

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
        // style={{ flex: 1, minWidth: 0 }}
      />
    </div>
  );
}
