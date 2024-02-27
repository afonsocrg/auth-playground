import "./styles.css";
import { Spin } from "antd";

export default function Loading() {
  return (
    <div className="spin-container">
      <Spin size="large" />
    </div>
  );
}
