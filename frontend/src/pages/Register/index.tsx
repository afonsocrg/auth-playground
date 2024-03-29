import { Link, useNavigate, Navigate } from "react-router-dom";
import { Button, Form, Input, Space, Typography, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
const { Title } = Typography;

import * as api from "@services/api";
import { RegistrationError } from "@services/api/errors";
import { useAuth } from "@hooks/AuthContext";
import { useNotification } from "@hooks/NotificationContext";

type FieldType = {
  username?: string;
  email?: string;
  password?: string;
  confirm?: string;
  terms_and_conditions?: boolean;
};

export default function Register() {
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const { fetch } = api.useApi();
  const { api: notificationApi } = useNotification();

  const onFinish = async (values: FieldType) => {
    try {
      console.log(values);
      const user = await fetch(() =>
        api.register(
          values.email,
          values.username,
          values.password,
          values.terms_and_conditions || false
        )
      );
      if (user) {
        login(user);
        navigate("/todos");
      }
    } catch (error) {
      if (error instanceof RegistrationError) {
        notificationApi.error({
          message: "Failed to register user",
          description: error.message,
        });
        return;
      }
      console.error("Caught error in page", error);
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  if (isAuthenticated) {
    return <Navigate to="/todos"></Navigate>;
  }

  return (
    <>
      <Title level={1}>Sign up</Title>
      <Form
        name="registration"
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
        <Form.Item
          name="terms_and_conditions"
          valuePropName="checked"
          rules={
            [
              ({}) => ({
                validator(_, value) {
                  if (value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "You must accept the Terms and Conditions to join the platform"
                    )
                  );
                },
              }),
            ]
          }
        >
          <Checkbox>
            I read and accept the{" "}
            <Link to="/terms_and_conditions" target="_blank">
              Terms and Conditions
            </Link>
          </Checkbox>
        </Form.Item>

        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Link to="/login">Already have an account? Log in!</Link>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}
