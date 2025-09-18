import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Typography, Card, Divider, Alert } from "antd";
import { useLogin } from "@refinedev/core";
import { LockOutlined, MailOutlined, GoogleOutlined, GithubOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const LoginPage: React.FC = () => {
  const { mutate: login, isLoading } = useLogin();
  const [error, setError] = useState<string | null>(null);

  const onFinish = (values: { email: string; password: string }) => {
    setError(null);
    login(values, {
      onError: () => {
        setError("Invalid email or password. Please try again.");
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl p-6 bg-white">
        <div className="text-center mb-6">
          <Title level={2} className="!mb-1 text-blue-600">🔎 Repazoo</Title>
          <Text type="secondary">AI-powered Reputation Management</Text>
        </div>

        {error && (
          <Alert
            message={error}
            type="error"
            showIcon
            className="mb-4 rounded-lg"
          />
        )}

        <Form
          name="login_form"
          layout="vertical"
          onFinish={onFinish}
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "Enter a valid email!" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="email@repazoo.com"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="********"
              size="large"
              className="rounded-lg"
            />
          </Form.Item>

          <div className="flex items-center justify-between mb-4">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <a href="#" className="text-blue-600 hover:underline text-sm">
              Forgot password?
            </a>
          </div>

          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={isLoading}
            className="w-full !bg-blue-600 hover:!bg-blue-700 rounded-lg shadow-md"
          >
            Sign In
          </Button>
        </Form>

        <Divider>Or continue with</Divider>
        <div className="flex justify-center space-x-4">
          <Button
            icon={<GoogleOutlined />}
            size="large"
            className="flex-1 border rounded-lg"
          >
            Google
          </Button>
          <Button
            icon={<GithubOutlined />}
            size="large"
            className="flex-1 border rounded-lg"
          >
            GitHub
          </Button>
        </div>

        <div className="text-center mt-6">
          <Text type="secondary">Don’t have an account?</Text>{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </div>
      </Card>
    </div>
  );
};
