import "./styles.css";
import { useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { Button, Form, Input, Checkbox, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import * as api from "@services/api";
import { useAuth } from "@hooks/AuthContext";
import { InvalidCredentialsError } from "@services/api/errors";

const { Text } = Typography;

type FieldType = {
  username?: string;
  password?: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [invalidCredentials, setInvalidCredentials] = useState(false);

  const [searchParams, _] = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/todos";

  const onFinish = async (values: FieldType) => {
    try {
      const user = await api.login(values.username, values.password);
      login(user);
      navigate(redirectPath);
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        setInvalidCredentials(true);
      }
      console.error("Unhandled error", error);
      throw error;
    }
  };

  return (
    <>
      <h1>Log in</h1>
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
        wrapperCol={{ span: 8 }}
        onFieldsChange={() => setInvalidCredentials(false)}
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
        {invalidCredentials && (
          <Text type="danger">Username or password are incorrect</Text>
        )}
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          {/* <a className="login-form-forgot" href=""> */}
          <Link to="/login" className="login-form-forgot">
            Forgot password
          </Link>
          {/* </a> */}
        </Form.Item>

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
    </>
  );
}
