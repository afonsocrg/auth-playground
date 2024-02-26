import "./styles.css";
import { Avatar, Typography } from "antd";
const { Title, Text } = Typography;

export default function Profile() {
  return (
    <div className="profile">
      <Avatar
        src={`https://api.dicebear.com/7.x/miniavs/svg?seed=1`}
        // size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
        size={150}
      />
      <div className="profile-details">
        <div className="username">afonsocrg</div>
        <div className="email">afonso.crg@gmail.com</div>
      </div>
    </div>
  );
}
