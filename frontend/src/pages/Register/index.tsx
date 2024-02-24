import { Link } from "react-router-dom";
import { Button, Form, Input, Space } from "antd";
import { useNavigate } from "react-router-dom";
import * as auth from "@services/api/auth";

type FieldType = {
  username?: string;
  email?: string;
  password?: string;
};

export default function Register() {
  const navigate = useNavigate();
  const onFinish = async (values: FieldType) => {
    console.log("Success:", values);
    navigate("/login");
    const resp = await auth.register(values.email, values.username, values.password);
    console.log("Got response", resp)
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <h1>Sign up</h1>
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
          label="Email"
          name="email"
          rules={[{ required: true, message: "Please input your email!" }]}
        >
          <Input />
        </Form.Item>
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
        <Form.Item<FieldType>
          label="Confirm password"
          name="password"
          rules={[{ required: true, message: "Please reinsert your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Link to="/login">Already have an account? Log in!</Link>
          </Space>
        </Form.Item>
      </Form>
      ;
    </>
  );
}
