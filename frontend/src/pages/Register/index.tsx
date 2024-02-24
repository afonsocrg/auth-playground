import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, Space, Typography } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
const { Text } = Typography;

import * as api from "@services/api";
import { RegistrationError } from "@services/api/errors";
import { useAuth } from "@hooks/AuthContext";

type FieldType = {
  username?: string;
  email?: string;
  password?: string;
  confirm?: string;
};

export default function Register() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [error, setError] = useState<string>(null);

  const onFinish = async (values: FieldType) => {
    try {
      setError(null);
      const user = await api.register(
        values.email,
        values.username,
        values.password
      );
      login(user);
      navigate("/tasks");
    } catch (error) {
      if (error instanceof RegistrationError) {
        setError(error.message);
        return;
      }
      console.error("Caught error in page", error);
    }
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
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item<FieldType>
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "The input is not valid E-mail!" },
          ]}
        >
          <Input
            prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
          />
        </Form.Item>

        <Form.Item<FieldType>
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item<FieldType>
          name="confirm"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please reinsert your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirm Password"
          />
        </Form.Item>
        {error && <Text type="danger">{error}</Text>}

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
