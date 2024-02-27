import "./styles.css";
import { Modal, Input, Button, Typography } from "antd";
import { useState } from "react";

const { Text } = Typography;

type Props = {
  isOpen: boolean;
  title: string;
  message: string;
  confirmationInput: string;
  handleOk: () => void;
  closeModal: () => void;
};
export default function ConfirmationModal({
  isOpen,
  title,
  message,
  handleOk,
  closeModal,
  confirmationInput,
}: Props) {
  const [input, setInput] = useState("");
  const [showError, setShowError] = useState(false);
  const isConfirmed = input === confirmationInput;

  const handleInputChange = (newValue) => {
    setShowError(false);
    setInput(newValue);
  };

  const handleConfirm = () => {
    if (!isConfirmed) {
      setShowError(true);
      return;
    }
    setInput("");
    handleOk();
  };

  const handleCancel = () => {
    setInput("");
    closeModal();
  };
  return (
    <Modal
      title={title}
      open={isOpen}
      onOk={handleConfirm}
      onCancel={handleCancel}
      className="confirm-modal"
      footer={
        <>
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={!isConfirmed}
            type="primary"
            danger
          >
            Confirm
          </Button>
        </>
      }
    >
      <div className="message">{message}</div>

      <div>
        Please type <strong>{confirmationInput}</strong> to confirm:
      </div>
      <Input
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
        onPressEnter={handleConfirm}
        className="input"
      ></Input>
      {showError && <Text type="danger">The input does not match!!</Text>}
    </Modal>
  );
}
