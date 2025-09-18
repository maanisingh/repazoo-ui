import React from "react";
import { Card, Button, Space, Typography } from "antd";
import { useList } from "@refinedev/core";
import { Link, useLocation } from "react-router-dom";
import {
  FileTextOutlined,
  ReloadOutlined,
  ThunderboltOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const { Title, Paragraph } = Typography;

export const ReportsPage: React.FC = () => {
  const location = useLocation();
  const mentionId = new URLSearchParams(location.search).get("mentionId");

  // Reports pulled from Strapi
  const { data, isLoading } = useList({
    resource: "reports",
    pagination: { pageSize: 10 },
    filters: mentionId ? [{ field: "mention", operator: "eq", value: mentionId }] : [],
    sorters: [{ field: "createdAt", order: "desc" }],
  });

  const reports = data?.data || [];

  // Mock chart data (replace with reports data)
  const chartData = [
    { name: "Week 1", sentiment: 30 },
    { name: "Week 2", sentiment: 45 },
    { name: "Week 3", sentiment: 60 },
    { name: "Week 4", sentiment: 50 },
  ];

  return (
    <div className="p-6 space-y-6">
      <Card className="rounded-xl shadow">
        <div className="flex justify-between items-center mb-4">
          <Title level={3} className="!m-0 flex items-center gap-2">
            <FileTextOutlined /> Reputation Reports
          </Title>
          <Space>
            <Link to="/mentions">
              <Button icon={<ExclamationCircleOutlined />}>View Mentions</Button>
            </Link>
            <Link to="/actions">
              <Button type="primary" icon={<ThunderboltOutlined />}>
                Manage Actions
              </Button>
            </Link>
          </Space>
        </div>

        {/* Charts */}
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <Line type="monotone" dataKey="sentiment" stroke="#1890ff" strokeWidth={2} />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>

        {/* Narrative */}
        <div className="mt-6">
          <Paragraph>
            📊 <strong>Insight:</strong> Your overall sentiment improved by <b>15%</b> compared
            to last month. Negative mentions dropped by <b>12</b>, and <b>8</b> actions were
            successfully resolved.
          </Paragraph>
          <Paragraph>
            🔍 Recommendation: Focus on LinkedIn engagement where positive growth is highest.
          </Paragraph>
        </div>

        {/* Reports List */}
        <div className="mt-6">
          {reports.map((r: any) => (
            <Card key={r.id} className="mb-4">
              <Title level={5}>{r.title}</Title>
              <Paragraph>{r.summary}</Paragraph>
              <Paragraph type="secondary">
                {new Date(r.createdAt).toLocaleString()}
              </Paragraph>
              <Space>
                <Button icon={<ReloadOutlined />}>Regenerate</Button>
                <Button icon={<FileTextOutlined />}>Download PDF</Button>
              </Space>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  );
};
