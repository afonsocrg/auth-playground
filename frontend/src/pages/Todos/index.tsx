import { Button, Typography } from "antd";
import { useState, useEffect } from "react";
import { List } from "antd";
import TodoItem from "@components/TodoItem";
import { PlusOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;
import * as api from "@services/api";

export default function Todos() {
  const [todos, setTodos] = useState([]);
  const [addingNew, setAddingNew] = useState(false);

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const todos = await api.getTodos();
    setTodos(todos);
  };

  const addTodo = async (name: string) => {
    if (name === "") {
      setAddingNew(false);
      return;
    }
    const todo = await api.addTodo(name);
    setTodos((prev) => [...prev, todo]);
    setAddingNew(false);
  };

  const updateTodo = async (id: number, newName: string) => {
    const newTodo = await api.changeTodo(id, newName);
    setTodos((prev) =>
      prev.map((item) => (item.id === newTodo.id ? newTodo : item))
    );
  };

  const completeTodo = async (id: number) => {
    const newTodo = await api.completeTodo(id);
    setTodos((prev) =>
      prev.map((item) => (item.id === newTodo.id ? newTodo : item))
    );
  };
  const incompleteTodo = async (id: number) => {
    const newTodo = await api.incompleteTodo(id);
    setTodos((prev) =>
      prev.map((item) => (item.id === newTodo.id ? newTodo : item))
    );
  };

  const removeTodo = async (id: number) => {
    await api.removeTodo(id);
    setTodos((prev) => prev.filter((item) => item.id !== id));
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
              onChange={(newName: string) => updateTodo(item.id, newName)}
              onComplete={() => completeTodo(item.id)}
              onIncomplete={() => incompleteTodo(item.id)}
              onRemove={() => removeTodo(item.id)}
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
