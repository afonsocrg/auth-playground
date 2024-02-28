import "./styles.css";
import { useEffect, useState } from "react";
import { Avatar, Button, Typography } from "antd";
import * as api from "@services/api";
import Loading from "@components/Loading";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@hooks/AuthContext";
import ConfirmationModal from "@components/ConfirmationModal";

const { Text } = Typography;

export default function Profile() {
  const [profile, setProfile] = useState<api.Profile>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const navigate = useNavigate();
  const { logout, login } = useAuth();
  const { fetch } = api.useApi();

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    const profile = await fetch(api.getProfile);
    setProfile(profile);
  };

  const deleteProfile = async () => {
    await fetch(api.deleteProfile);
    logout();
    navigate("/");
  };

  const handleModalOk = () => {
    setIsModalOpen(false);
    deleteProfile();
  };

  const updateProfile = async (payload) => {
    const newProfile = await fetch(() => api.editProfile(payload));
    if (newProfile) {
      login(newProfile);
      setProfile(newProfile);
    }
  };

  const handleChangeUsername = (newName) => {
    if (newName === profile.username) {
      return;
    }
    updateProfile({ username: newName });
  };
  const handleChangeEmail = (newEmail) => {
    if (newEmail === profile.email) {
      return;
    }
    updateProfile({ email: newEmail });
  };

  return profile ? (
    <div className="profile">
      <div className="avatar">
        <Avatar
          src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${profile.id}`}
          // size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
          size={150}
        />
      </div>
      <div className="profile-details">
        <div>
          <Text
            editable={{
              onChange: handleChangeUsername,
              triggerType: ["text", "icon"],
              enterIcon: null,
            }}
            className="username"
          >
            {profile.username}
          </Text>
        </div>
        <div>
          <Text
            editable={{
              onChange: handleChangeEmail,
              triggerType: ["text", "icon"],
              enterIcon: null,
            }}
            className="email"
          >
            {profile.email}
          </Text>
        </div>
        <div className="delete-button">
          <Button danger onClick={() => setIsModalOpen(true)}>
            Delete Profile
          </Button>
        </div>
      </div>
      <ConfirmationModal
        isOpen={isModalOpen}
        title="Are you sure you want to delete your profile?"
        message={"All your data and To-Dos will be lost"}
        handleOk={handleModalOk}
        closeModal={() => setIsModalOpen(false)}
        confirmationInput={profile.email}
      />
    </div>
  ) : (
    <Loading />
  );
}
