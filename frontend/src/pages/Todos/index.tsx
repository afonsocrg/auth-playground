import "./styles.css";
import { useState, useEffect } from "react";
import { Button, Typography, List } from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";

import * as api from "@services/api";
import TodoItem from "@components/TodoItem";

const { Title, Text } = Typography;

export default function Todos() {
  const [todos, setTodos] = useState<api.Todo[]>([]);
  const [addingNew, setAddingNew] = useState(false);

  const { fetch } = api.useApi();

  useEffect(() => {
    getTodos();
  }, []);

  const getTodos = async () => {
    const todos = await fetch(api.getTodos);
    setTodos(todos);
  };

  const addTodo = async (name: string) => {
    if (name === "") {
      setAddingNew(false);
      return;
    }
    const todo = await fetch(() => api.addTodo(name));
    setTodos((prev) => [...prev, todo]);
    setAddingNew(false);
  };

  const updateTodo = async (id: number, newName: string) => {
    const newTodo = await fetch(() => api.changeTodo(id, newName));
    setTodos((prev) =>
      prev.map((item) => (item.id === newTodo.id ? newTodo : item))
    );
  };

  const completeTodo = async (id: number) => {
    const newTodo = await fetch(() => api.completeTodo(id));
    setTodos((prev) =>
      prev.map((item) => (item.id === newTodo.id ? newTodo : item))
    );
  };
  const incompleteTodo = async (id: number) => {
    const newTodo = await fetch(() => api.incompleteTodo(id));
    setTodos((prev) =>
      prev.map((item) => (item.id === newTodo.id ? newTodo : item))
    );
  };

  const removeTodo = async (id: number) => {
    await fetch(() => api.removeTodo(id));
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <>
      <Title>To-Do list</Title>
      <div>
        <Button icon={<PlusOutlined />} onClick={() => setAddingNew(true)}>
          Add To-Do
        </Button>

        <Button icon={<ReloadOutlined />} onClick={getTodos}>
          Refresh
        </Button>
      </div>
      {addingNew && (
        <Text
          autoFocus
          editable={{
            editing: true,
            onChange: addTodo,
            onCancel: () => setAddingNew(false),
          }}
        />
      )}
      <List
        // pagination={{ position: "bottom", align: "center" }}
        dataSource={todos}
        renderItem={(item) => (
          <div className="list-item">
            <List.Item>
              <TodoItem
                todo={item}
                onChange={(newName: string) => updateTodo(item.id, newName)}
                onComplete={() => completeTodo(item.id)}
                onIncomplete={() => incompleteTodo(item.id)}
                onRemove={() => removeTodo(item.id)}
              />
            </List.Item>
          </div>
        )}
      />
    </>
  );
}
