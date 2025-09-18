import { Card, Form, Input, Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const handleReset = (values: any) => {
    console.log("Password reset with new password:", values.password);
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <Title level={3} className="text-center mb-6">
          Reset Password
        </Title>
        <Form layout="vertical" onFinish={handleReset}>
          <Form.Item label="New Password" name="password" rules={[{ required: true }]}>
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

