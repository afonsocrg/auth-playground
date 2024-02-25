import { Button, Typography } from "antd";
import { useState } from "react";
import { List } from "antd";
import TodoItem from "@components/TodoItem";
import { PlusOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

const data = [
  {
    id: 1,
    done: false,
    name: "To-Do #1",
  },
  {
    id: 2,
    done: true,
    name: "To-Do #2",
  },
  {
    id: 3,
    done: false,
    name: "To-Do #3",
  },
  {
    id: 4,
    done: false,
    name: "To-Do #4",
  },
];

export default function Todos() {
  const [todos, setTodos] = useState(data);
  const [addingNew, setAddingNew] = useState(true);
  const updateTodo = (newTodo) =>
    setTodos((prev) =>
      prev.map((item) => (item.id === newTodo.id ? newTodo : item))
    );

  const addTodo = (name) => {
    if (name === "") return;
    const maxId = todos.reduce(
      (prev, current) => (prev.id < current.id ? current : prev),
      { id: 0 }
    ).id;
    setTodos((prev) => [{ id: maxId + 1, name, done: false }, ...prev]);
    setAddingNew(false);
  };

  const removeTodo = (id) => {
    
  };
  return (
    <>
      <Title>To-Do list</Title>
      {addingNew ? (
        <Text
          editable={{
            editing: true,
            onChange: addTodo,
            onCancel: () => setAddingNew(false),
          }}
        />
      ) : (
        <Button icon={<PlusOutlined />} onClick={() => setAddingNew(true)}>
          Add To-Do
        </Button>
      )}
      <List
        pagination={{ position: "bottom", align: "center" }}
        dataSource={todos}
        renderItem={(item) => (
          <List.Item>
            <TodoItem
              todo={item}
              onChange={updateTodo}
              onRemove={() => setTodos((prev) => prev.filter((i) => i.id !== item.id))}
            />
            {/* <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                />
              }
              title={<a href="https://ant.design">{item.title}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            /> */}
          </List.Item>
        )}
      />
    </>
  );
}
