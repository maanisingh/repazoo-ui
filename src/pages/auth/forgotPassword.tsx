import { Card, Form, Input, Button, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

export const ForgotPasswordPage = () => {
  const handleSubmit = (values: any) => {
    console.log("Password reset link requested for:", values.email);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <Title level={3} className="text-center mb-6">
          Forgot Password
        </Title>
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Send Reset Link
            </Button>
          </Form.Item>
          <div className="text-center">
            <Link to="/login">Back to Login</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

