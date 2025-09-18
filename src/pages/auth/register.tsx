import { useState } from "react";
import { Card, Form, Input, Button, Typography } from "antd";
import { useNavigate, Link } from "react-router-dom";

const { Title } = Typography;

export const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (values: any) => {
    setLoading(true);
    // Mock register logic → replace with Strapi later
    localStorage.setItem("token", "fake-token");
    localStorage.setItem("user", JSON.stringify({ email: values.email }));
    setLoading(false);
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <Title level={3} className="text-center mb-6">
          Create an Account
        </Title>
        <Form layout="vertical" onFinish={handleRegister}>
          <Form.Item label="Email" name="email" rules={[{ required: true }]}>
            <Input type="email" />
          </Form.Item>
          <Form.Item label="Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading} block>
              Register
            </Button>
          </Form.Item>
          <div className="text-center">
            Already have an account? <Link to="/login">Login</Link>
          </div>
        </Form>
      </Card>
    </div>
  );
};

