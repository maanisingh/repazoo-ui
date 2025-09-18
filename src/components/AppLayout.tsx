import React, { useState } from "react";
import {
  Layout,
  Menu,
  Dropdown,
  Switch,
  Avatar,
  Badge,
  List,
  Button,
} from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  ExclamationCircleOutlined,
  FileTextOutlined,
  ThunderboltOutlined,
  BellOutlined,
  SettingOutlined,
  CustomerServiceOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useList } from "@refinedev/core";

const { Header, Sider, Content } = Layout;

export const AppLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Notifications preview
  const { data: notifData } = useList({
    resource: "notifications",
    pagination: { pageSize: 5 },
    sorters: [{ field: "createdAt", order: "desc" }],
  });
  const notifications = notifData?.data || [];

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    {
      key: "dashboard",
      icon: <DashboardOutlined />,
      label: <Link to="/dashboard">Dashboard</Link>,
    },
    {
      key: "mentions",
      icon: <ExclamationCircleOutlined />,
      label: <Link to="/mentions">Mentions</Link>,
    },
    {
      key: "reports",
      icon: <FileTextOutlined />,
      label: <Link to="/reports">Reports</Link>,
    },
    {
      key: "actions",
      icon: <ThunderboltOutlined />,
      label: <Link to="/actions">Actions</Link>,
    },
    {
      key: "notifications",
      icon: <BellOutlined />,
      label: <Link to="/notifications">Notifications</Link>,
    },
    {
      key: "settings",
      icon: <SettingOutlined />,
      label: <Link to="/settings">Settings</Link>,
    },
    {
      key: "support",
      icon: <CustomerServiceOutlined />,
      label: <Link to="/support">Support</Link>,
    },
  ];

  const profileMenu = (
    <Menu>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/settings">Profile & Settings</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
        <span onClick={() => navigate("/logout")}>Log Out</span>
      </Menu.Item>
    </Menu>
  );

  const notificationsMenu = (
    <List
      size="small"
      dataSource={notifications}
      renderItem={(n: any) => (
        <List.Item>
          <List.Item.Meta
            title={<Link to={`/${n.type === "report" ? "reports" : n.type}`}>{n.title}</Link>}
            description={new Date(n.createdAt).toLocaleString()}
          />
        </List.Item>
      )}
    />
  );

  return (
    <Layout className={darkMode ? "dark" : ""} style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider trigger={null} collapsible collapsed={collapsed} className="bg-white dark:bg-gray-900 shadow-lg">
        <div className="text-center py-4 font-bold text-lg text-blue-600 dark:text-blue-400">
          {collapsed ? "RZ" : "🔎 Repazoo"}
        </div>
        <Menu
          theme={darkMode ? "dark" : "light"}
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          items={menuItems}
        />
      </Sider>

      <Layout>
        {/* Header */}
        <Header className="flex justify-between items-center px-4 shadow bg-white dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapsed}
            />
            <span className="font-semibold text-lg text-gray-700 dark:text-gray-200">
              {collapsed ? "" : "Repazoo Admin"}
            </span>
          </div>

          <div className="flex items-center gap-6">
            {/* Dark Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600 dark:text-gray-300">🌞</span>
              <Switch
                checked={darkMode}
                onChange={(checked) => setDarkMode(checked)}
              />
              <span className="text-xs text-gray-600 dark:text-gray-300">🌙</span>
            </div>

            {/* Notifications */}
            <Dropdown overlay={notificationsMenu} placement="bottomRight" trigger={["click"]}>
              <Badge count={notifications.filter((n: any) => !n.read).length}>
                <BellOutlined style={{ fontSize: 20, cursor: "pointer" }} />
              </Badge>
            </Dropdown>

            {/* Profile Menu */}
            <Dropdown overlay={profileMenu} placement="bottomRight" trigger={["click"]}>
              <Avatar style={{ backgroundColor: "#1890ff", cursor: "pointer" }}>U</Avatar>
            </Dropdown>
          </div>
        </Header>

        {/* Main Content */}
        <Content className="p-6 bg-gray-50 dark:bg-gray-900">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

