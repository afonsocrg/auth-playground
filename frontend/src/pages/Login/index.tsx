import "./styles.css";
import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, Checkbox, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import * as api from "@services/api";
import { useAuth } from "@hooks/AuthContext";
import { useNotification } from "@hooks/NotificationContext";
import { InvalidCredentialsError } from "@services/api/errors";

const { Text, Title } = Typography;

type FieldType = {
  username?: string;
  password?: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { api: notificationApi } = useNotification();

  const [searchParams, _] = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/todos";

  const onFinish = async (values: FieldType) => {
    try {
      const user = await api.login(values.username, values.password);
      login(user);
      navigate(redirectPath);
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        notificationApi.error({
          message: "Failed to Log In",
          description: "Username or password are incorrect",
        });
      }
      console.error("Unhandled error", error);
      throw error;
    }
  };

  return (
    <div className="login-container">
      <Title level={1}>Log in</Title>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        wrapperCol={{ span: 8 }}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>

        {/* <Form.Item> */}
        {/* <Form.Item name="remember" valuePropName="checked" noStyle> */}
        {/* <Checkbox>Remember me</Checkbox> */}
        {/* </Form.Item> */}
        {/* <a className="login-form-forgot" href=""> */}
        {/* <Link to="/login" className="login-form-forgot"> */}
        {/* Forgot password */}
        {/* </Link> */}
        {/* </a> */}
        {/* </Form.Item> */}

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/register">register now!</Link>
        </Form.Item>
      </Form>
    </div>
  );
}
