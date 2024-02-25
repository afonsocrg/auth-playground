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
  onChange: (newName: string) => void;
  onComplete: () => void;
  onIncomplete: () => void;
  onRemove: () => void;
};
export default function TodoItem({
  todo,
  onChange,
  onComplete,
  onIncomplete,
  onRemove,
}: Props) {
  const { name, done } = todo;

  const onChangeDone = (e) => {
    const done = e.target.checked;
    done ? onComplete() : onIncomplete();
  };
  const onChangeName = (value) => {
    onChange(value);
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
