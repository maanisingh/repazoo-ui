import React, { useState } from "react";
import { Form, Input, Button, Typography, Card, Alert } from "antd";
import { useForgotPassword } from "@refinedev/core";
import { MailOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export const ForgotPasswordPage: React.FC = () => {
  const { mutate: forgotPassword, isLoading } = useForgotPassword();
  const [messageInfo, setMessageInfo] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onFinish = (values: { email: string }) => {
    setError(null);
    forgotPassword(values, {
      onSuccess: () => setMessageInfo("Check your email for reset instructions."),
      onError: () => setError("Failed to send reset email."),
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
      <Card className="w-full max-w-md shadow-2xl rounded-2xl p-6 bg-white">
        <div className="text-center mb-6">
          <Title level={2} className="!mb-1 text-blue-600">🔎 Repazoo</Title>
          <Text type="secondary">Reset your password</Text>
        </div>

        {error && <Alert message={error} type="error" showIcon className="mb-4" />}
        {messageInfo && <Alert message={messageInfo} type="success" showIcon className="mb-4" />}

        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item name="email" label="Email" rules={[{ required: true, type: "email" }]}>
            <Input prefix={<MailOutlined />} placeholder="email@repazoo.com" size="large" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={isLoading} size="large" className="w-full">
            Send Reset Link
          </Button>
        </Form>
      </Card>
    </div>
  );
};
