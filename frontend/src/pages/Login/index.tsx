import { useAuth } from "@hooks/AuthContext";
import { Link } from "react-router-dom";
import { Button, Form, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const onFinish = (values: FieldType) => {
    console.log("Success:", values);
    login();
    navigate("/tasks");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <h1>Log in</h1>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Link to="/register">Don't have an account? Sign up!</Link>
          </Space>
        </Form.Item>
      </Form>
      ;
    </>
  );
}
