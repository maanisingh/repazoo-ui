import React from "react";
import { Card, Table, Tag, Button, Space } from "antd";
import { useList } from "@refinedev/core";
import { Link } from "react-router-dom";
import { ExclamationCircleOutlined, FileTextOutlined, ThunderboltOutlined } from "@ant-design/icons";

export const MentionsPage: React.FC = () => {
  const { data, isLoading } = useList({
    resource: "mentions",
    pagination: { pageSize: 20 },
    sorters: [{ field: "createdAt", order: "desc" }],
  });

  const mentions = data?.data || [];

  const columns = [
    {
      title: "Source",
      dataIndex: "platform",
      key: "platform",
      render: (text: string) => <Tag color="blue">{text}</Tag>,
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      render: (text: string) => <span className="line-clamp-2">{text}</span>,
    },
    {
      title: "Sentiment",
      dataIndex: "sentiment",
      key: "sentiment",
      render: (sentiment: string) => {
        const color =
          sentiment === "negative" ? "red" : sentiment === "positive" ? "green" : "orange";
        return <Tag color={color}>{sentiment}</Tag>;
      },
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (val: string) => new Date(val).toLocaleString(),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          <Link to={`/actions?mentionId=${record.id}`}>
            <Button type="primary" icon={<ThunderboltOutlined />}>
              Take Action
            </Button>
          </Link>
          <Link to={`/reports?mentionId=${record.id}`}>
            <Button icon={<FileTextOutlined />}>Generate Report</Button>
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <Card className="rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold flex items-center gap-2">
            <ExclamationCircleOutlined /> Mentions
          </h1>
          <Space>
            <Link to="/reports">
              <Button icon={<FileTextOutlined />}>View All Reports</Button>
            </Link>
            <Link to="/actions">
              <Button type="primary" icon={<ThunderboltOutlined />}>
                Manage Actions
              </Button>
            </Link>
          </Space>
        </div>

        <Table
          loading={isLoading}
          rowKey="id"
          columns={columns}
          dataSource={mentions}
          pagination={{ pageSize: 20 }}
          className="rounded-xl shadow"
        />
      </Card>
    </div>
  );
};
