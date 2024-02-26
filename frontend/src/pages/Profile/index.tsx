import "./styles.css";
import { useEffect, useState } from "react";
import { Avatar, Typography } from "antd";
import * as api from "@services/api";

const { Title, Text } = Typography;

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const { fetch } = api.useApi();
  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const profile = await fetch(api.getProfile);
    setProfile(profile);
  };
  return (
    profile && (
      <div className="profile">
        <div className="avatar">
          <Avatar
            src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${profile.id}`}
            // size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
            size={150}
          />
        </div>
        <div className="profile-details">
          <div className="username">{profile.username}</div>
          <div className="email">{profile.email}</div>
        </div>
      </div>
    )
  );
}
