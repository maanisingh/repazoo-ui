import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, Alert } from "antd";
import { useRegister } from "@refinedev/core";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;
export const SignupPage: React.FC = () => {
  const { mutate: register, isLoading } = useRegister();
  const [error, setError] = useState<string | null>(null);

  const onFinish = (values: { email: string; password: string; name: string }) => {
    setError(null);
    register(values, {
      onError: () => setError("Registration failed. Try again."),
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl p-6 bg-white">
        <div className="text-center mb-6">
          <Title level={2} className="!mb-1 text-blue-600">🔎 Repazoo</Title>
          <Text type="secondary">Create your account</Text>
        </div>

        {error && <Alert message={error} type="error" showIcon className="mb-4 rounded-lg" />}

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="Full Name" rules={[{ required: true }]}>
            <Input prefix={<UserOutlined />} placeholder="John Doe" size="large" />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input prefix={<MailOutlined />} placeholder="email@repazoo.com" size="large" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="********" size="large" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            size="large"
            className="w-full !bg-blue-600 hover:!bg-blue-700 rounded-lg shadow-md"
          >
            Sign Up
          </Button>
        </Form>

        <div className="text-center mt-6">
          <Text type="secondary">Already have an account?</Text>{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Log in
          </a>
        </div>
      </Card>
    </div>
  );
};
