import React from "react";
import { Card, List, Tag, Badge, Button, Space } from "antd";
import { useList, useUpdate } from "@refinedev/core";
import {
  BellOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  ThunderboltOutlined,
  TeamOutlined,
  SettingOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const NotificationsPage: React.FC = () => {
  const { data, isLoading } = useList({
    resource: "notifications",
    pagination: { pageSize: 20 },
    sorters: [{ field: "createdAt", order: "desc" }],
  });
  const { mutate: updateNotification } = useUpdate();

  const notifications = data?.data || [];

  const handleMarkAsRead = (id: number) => {
    updateNotification({
      resource: "notifications",
      id,
      values: { read: true },
    });
  };

  const renderLink = (n: any) => {
    switch (n.type) {
      case "negative":
        return <Link to="/mentions">View Mentions</Link>;
      case "report":
        return <Link to="/reports">View Report</Link>;
      case "action":
        return <Link to="/actions">View Action</Link>;
      case "subscription":
        return <Link to="/settings">Manage Subscription</Link>;
      case "team":
        return <Link to="/team">Manage Team</Link>;
      default:
        return null;
    }
  };

  const typeColors: Record<string, string> = {
    negative: "red",
    report: "blue",
    action: "green",
    subscription: "orange",
    team: "purple",
  };

  const typeIcons: Record<string, JSX.Element> = {
    negative: <ExclamationCircleOutlined />,
    report: <FileTextOutlined />,
    action: <ThunderboltOutlined />,
    subscription: <SettingOutlined />,
    team: <TeamOutlined />,
  };

  return (
    <div className="p-6 space-y-6">
      <Card className="rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <BellOutlined /> Notifications
          </h1>
          <Badge count={notifications.filter((n: any) => !n.read).length} />
        </div>

        <List
          loading={isLoading}
          dataSource={notifications}
          renderItem={(n: any) => (
            <List.Item
              className="rounded-lg p-3 bg-gray-50 dark:bg-gray-800 mb-2 shadow-sm"
              actions={[
                !n.read && (
                  <Button type="link" onClick={() => handleMarkAsRead(n.id)}>
                    Mark as Read
                  </Button>
                ),
                renderLink(n),
              ]}
            >
              <List.Item.Meta
                avatar={typeIcons[n.type] || <CheckCircleOutlined />}
                title={
                  <div className="flex justify-between">
                    <span>
                      <Tag color={typeColors[n.type] || "default"}>{n.type}</Tag> {n.title}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(n.createdAt).toLocaleString()}
                    </span>
                  </div>
                }
                description={n.message}
              />
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};
