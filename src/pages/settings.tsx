import React, { useState } from "react";
import { Card, Tabs, Form, Input, Button, Switch, Tag, message } from "antd";
import { useList, useUpdate } from "@refinedev/core";
import {
  SettingOutlined,
  UserOutlined,
  BellOutlined,
  CreditCardOutlined,
  TeamOutlined,
  FileProtectOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const SettingsPage: React.FC = () => {
  const { data: subData } = useList({
    resource: "subscriptions",
    pagination: { pageSize: 1 },
  });
  const subscription = subData?.data?.[0];

  const { mutate: updateUser } = useUpdate();

  const [form] = Form.useForm();

  const handleProfileSave = (values: any) => {
    updateUser(
      {
        resource: "users",
        id: "me", // Strapi plugin usually allows updating current user
        values,
      },
      {
        onSuccess: () => message.success("Profile updated"),
        onError: () => message.error("Failed to update profile"),
      }
    );
  };

  return (
    <div className="p-6 space-y-6">
      <Card className="rounded-xl shadow">
        <h1 className="text-xl font-bold flex items-center gap-2 mb-4">
          <SettingOutlined /> Settings
        </h1>

        <Tabs
          defaultActiveKey="profile"
          items={[
            {
              key: "profile",
              label: (
                <span>
                  <UserOutlined /> Profile
                </span>
              ),
              children: (
                <Form form={form} layout="vertical" onFinish={handleProfileSave}>
                  <Form.Item label="Name" name="name">
                    <Input placeholder="Your full name" />
                  </Form.Item>
                  <Form.Item label="Email" name="email">
                    <Input disabled />
                  </Form.Item>
                  <Form.Item label="Password" name="password">
                    <Input.Password placeholder="••••••••" />
                  </Form.Item>
                  <Button type="primary" htmlType="submit">
                    Save Changes
                  </Button>
                </Form>
              ),
            },
            {
              key: "notifications",
              label: (
                <span>
                  <BellOutlined /> Notifications
                </span>
              ),
              children: (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Email Alerts</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Negative Mention Alerts</span>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Weekly Reports</span>
                    <Switch />
                  </div>
                </div>
              ),
            },
            {
              key: "subscription",
              label: (
                <span>
                  <CreditCardOutlined /> Subscription
                </span>
              ),
              children: (
                <div className="space-y-4">
                  <p>
                    Current Plan:{" "}
                    <Tag color="blue">{subscription?.plan || "Free"}</Tag>
                  </p>
                  <p>
                    Seats: {subscription?.seatsUsed || 1} /{" "}
                    {subscription?.seatLimit || 1}
                  </p>
                  <p>
                    Mentions: {subscription?.mentionsUsed || 0} /{" "}
                    {subscription?.mentionsLimit || "∞"}
                  </p>
                  <p>
                    Actions Completed: {subscription?.actionsCompleted || 0}
                  </p>
                  <Button type="primary">Upgrade Plan</Button>
                </div>
              ),
            },
            ...(subscription?.plan !== "Free"
              ? [
                  {
                    key: "team",
                    label: (
                      <span>
                        <TeamOutlined /> Team Management
                      </span>
                    ),
                    children: (
                      <div>
                        <p>Manage your team members and roles.</p>
                        <Link to="/team">
                          <Button type="primary">Go to Team Page</Button>
                        </Link>
                      </div>
                    ),
                  },
                ]
              : []),
            {
              key: "legal",
              label: (
                <span>
                  <FileProtectOutlined /> Legal
                </span>
              ),
              children: (
                <div className="space-y-2">
                  <Link to="/terms">
                    <Button type="link">Terms of Service</Button>
                  </Link>
                  <Link to="/privacy">
                    <Button type="link">Privacy Policy</Button>
                  </Link>
                </div>
              ),
            },
          ]}
        />
      </Card>
    </div>
  );
};
