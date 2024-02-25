import "./styles.css";
import { useState } from "react";
import { Checkbox, Typography } from "antd";
import { CloseOutlined } from "@ant-design/icons";
const { Text } = Typography;

type Todo = {
  id: number;
  name: string;
  done: boolean;
};
type Props = {
  todo: Todo;
  onChange: (todo: Todo) => void;
  onRemove: () => void;
};
export default function TodoItem({ todo, onChange, onRemove }: Props) {
  const { name, done } = todo;

  const onChangeDone = (e) => {
    const done = e.target.checked;
    onChange({ ...todo, done });
  };
  const onChangeName = (value) => {
    onChange({ ...todo, name: value });
  };
  return (
    <div className="todo-item">
      <Checkbox checked={done} onChange={onChangeDone} className="checkbox" />
      <div className="name">
        <Text
          editable={{
            onChange: onChangeName,
            triggerType: ["text"],
            enterIcon: null,
          }}
        >
          {name}
        </Text>
      </div>
      <div className="close" onClick={onRemove}>
        <CloseOutlined />
      </div>
    </div>
  );
}
