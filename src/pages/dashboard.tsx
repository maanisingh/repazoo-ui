import React from "react";
import { Card, Statistic, Table, List, Tag, Badge, Button } from "antd";
import { useList } from "@refinedev/core";
import {
  TeamOutlined,
  BellOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ArrowRightOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const DashboardPage: React.FC = () => {
  // Team usage (top 5 recent logins)
  const { data: teamData, isLoading: loadingTeam } = useList({
    resource: "team-members",
    pagination: { pageSize: 5 },
    sorters: [{ field: "lastLogin", order: "desc" }],
  });
  const team = teamData?.data || [];

  // Notifications (latest 5)
  const { data: notifData, isLoading: loadingNotif } = useList({
    resource: "notifications",
    pagination: { pageSize: 5 },
    sorters: [{ field: "createdAt", order: "desc" }],
  });
  const notifications = notifData?.data || [];

  // Subscription (first/only record for this user/team)
  const { data: subData } = useList({
    resource: "subscriptions",
    pagination: { pageSize: 1 },
  });
  const subscription = subData?.data?.[0];

  const teamColumns = [
    {
      title: "Member",
      dataIndex: ["user", "name"],
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={role === "admin" ? "red" : role === "analyst" ? "blue" : "green"}>
          {role}
        </Tag>
      ),
    },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
      key: "lastLogin",
      render: (val: string) => (val ? new Date(val).toLocaleString() : "Never"),
    },
    {
      title: "Mentions Reviewed",
      dataIndex: ["usageStats", "mentionsReviewed"],
      key: "mentionsReviewed",
    },
    {
      title: "Actions Taken",
      dataIndex: ["usageStats", "actionsTaken"],
      key: "actionsTaken",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="rounded-xl shadow">
          <Statistic
            title="Plan"
            value={subscription?.plan || "Free"}
            prefix={<BarChartOutlined />}
          />
          <p className="text-gray-500 text-sm mt-2">
            {subscription?.seatsUsed || 0} / {subscription?.seatLimit || "∞"} seats
          </p>
          <Link to="/settings">
            <Button type="link" icon={<ArrowRightOutlined />}>
              Manage Subscription
            </Button>
          </Link>
        </Card>

        <Card className="rounded-xl shadow">
          <Statistic
            title="Mentions Processed"
            value={subscription?.mentionsUsed || 0}
            suffix={`/ ${subscription?.mentionsLimit || "∞"}`}
          />
          <Link to="/reports">
            <Button type="link" icon={<ArrowRightOutlined />}>
              View Reports
            </Button>
          </Link>
        </Card>

        <Card className="rounded-xl shadow">
          <Statistic
            title="Actions Completed"
            value={subscription?.actionsCompleted || 0}
            prefix={<CheckCircleOutlined />}
          />
          <Link to="/actions">
            <Button type="link" icon={<ArrowRightOutlined />}>
              View Actions
            </Button>
          </Link>
        </Card>
      </div>

      {/* Notifications */}
      <Card className="rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <BellOutlined /> Recent Notifications
          </h2>
          <Link to="/notifications">
            <Button type="link" icon={<ArrowRightOutlined />}>
              See All
            </Button>
          </Link>
        </div>
        <List
          loading={loadingNotif}
          dataSource={notifications}
          renderItem={(n: any) => (
            <List.Item className="rounded-lg p-3 bg-gray-50 dark:bg-gray-800 mb-2 shadow-sm">
              <List.Item.Meta
                title={
                  <div className="flex justify-between">
                    <span>
                      <Tag color={n.type === "negative" ? "red" : "blue"}>{n.type}</Tag>{" "}
                      {n.title}
                    </span>
                    <span className="text-xs text-gray-400">
                      {new Date(n.createdAt).toLocaleString()}
                    </span>
                  </div>
                }
                description={n.message}
              />
              {!n.read && <Badge status="processing" text="Unread" />}
            </List.Item>
          )}
        />
      </Card>

      {/* Team Activity */}
      <Card className="rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <TeamOutlined /> Team Activity
          </h2>
          <Link to="/team">
            <Button type="link" icon={<ArrowRightOutlined />}>
              Manage Team
            </Button>
          </Link>
        </div>
        <Table
          loading={loadingTeam}
          rowKey="id"
          columns={teamColumns}
          dataSource={team}
          pagination={false}
          className="rounded-xl shadow"
        />
      </Card>
    </div>
  );
};
