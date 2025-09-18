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
  Card,
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

  // Notifications
  const { data: notifData } = useList({
    resource: "notifications",
    pagination: { pageSize: 5 },
    sorters: [{ field: "createdAt", order: "desc" }],
  });
  const notifications = notifData?.data || [];

  const toggleCollapsed = () => setCollapsed(!collapsed);

  // Top menu items
  const topMenuItems = [
    { key: "home", icon: <DashboardOutlined />, label: <Link to="/">Home</Link> },
    { key: "mentions", icon: <ExclamationCircleOutlined />, label: <Link to="/mentions">Mentions</Link> },
    { key: "reports", icon: <FileTextOutlined />, label: <Link to="/reports">Reports</Link> },
    { key: "actions", icon: <ThunderboltOutlined />, label: <Link to="/actions">Actions</Link> },
    { key: "notifications", icon: <BellOutlined />, label: <Link to="/notifications">Notifications</Link> },
  ];

  // Bottom menu items
  const bottomMenuItems = [
    { key: "settings", icon: <SettingOutlined />, label: <Link to="/settings">Settings</Link> },
    { key: "support", icon: <CustomerServiceOutlined />, label: <Link to="/support">Support</Link> },
  ];

  const profileMenu = (
    <Menu theme={darkMode ? "dark" : "light"}>
      <Menu.Item key="profile" icon={<UserOutlined />}>
        <Link to="/settings">Profile & Settings</Link>
      </Menu.Item>
      <Menu.Item key="logout" icon={<LogoutOutlined />} danger>
        <span onClick={() => navigate("/logout")}>Log Out</span>
      </Menu.Item>
    </Menu>
  );

  const notificationsMenu = (
    <Card className="w-72 shadow-lg rounded-lg">
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
    </Card>
  );

  return (
    <Layout className="min-h-screen">
      {/* Sidebar */}
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        width={220}
        style={{
          height: "100vh",
          position: "fixed",
          left: 0,
          top: 0,
          background: darkMode ? "#111827" : "#ffffff", // dark gray / white
        }}
      >
        <div className="flex flex-col justify-between h-full">
          {/* Top navigation */}
          <Menu
            theme={darkMode ? "dark" : "light"}
            mode="inline"
            defaultSelectedKeys={["home"]}
            items={topMenuItems}
            style={{ flexGrow: 1, background: "transparent" }}
            className="
              mt-4
              [&_.ant-menu-item]:!rounded-lg 
              [&_.ant-menu-item]:mx-2 
              [&_.ant-menu-item]:my-1
              [&_.ant-menu-item]:hover:!bg-gray-100 
              dark:[&_.ant-menu-item]:hover:!bg-gray-800
              [&_.ant-menu-item-selected]:!bg-gray-200 
              dark:[&_.ant-menu-item-selected]:!bg-gray-700 
              [&_.ant-menu-item-selected]:!text-gray-900 
              dark:[&_.ant-menu-item-selected]:!text-gray-100
            "
          />

          {/* Bottom navigation */}
          <Menu
            theme={darkMode ? "dark" : "light"}
            mode="inline"
            items={bottomMenuItems}
            style={{ background: "transparent" }}
            className="
              mb-4
              [&_.ant-menu-item]:!rounded-lg 
              [&_.ant-menu-item]:mx-2 
              [&_.ant-menu-item]:my-1
              [&_.ant-menu-item]:hover:!bg-gray-100 
              dark:[&_.ant-menu-item]:hover:!bg-gray-800
              [&_.ant-menu-item-selected]:!bg-gray-200 
              dark:[&_.ant-menu-item-selected]:!bg-gray-700 
              [&_.ant-menu-item-selected]:!text-gray-900 
              dark:[&_.ant-menu-item-selected]:!text-gray-100
            "
          />
        </div>
      </Sider>

      <Layout style={{ marginLeft: collapsed ? 80 : 220, transition: "margin-left 0.2s" }}>
        {/* Header */}
        <Header
          className={`flex justify-between items-center px-6 h-16 border-b ${
            darkMode ? "bg-gray-900 border-gray-700" : "bg-gray-100 border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={toggleCollapsed}
              className={darkMode ? "!text-gray-200" : "!text-gray-700"}
            />
          </div>

          <div className="flex items-center gap-6">
            {/* Dark Mode Toggle */}
            <div className="flex items-center gap-2">
              <span className={darkMode ? "text-gray-400 text-xs" : "text-gray-600 text-xs"}>🌞</span>
              <Switch
                checked={darkMode}
                onChange={(c) => setDarkMode(c)}
                style={{
                  backgroundColor: darkMode ? "#4b5563" : "#d1d5db", // gray-600 / gray-300
                }}
              />
              <span className={darkMode ? "text-gray-400 text-xs" : "text-gray-600 text-xs"}>🌙</span>
            </div>

            {/* Notifications */}
            <Dropdown overlay={notificationsMenu} placement="bottomRight" trigger={["click"]}>
              <Badge count={notifications.filter((n: any) => !n.read).length}>
                <BellOutlined
                  style={{ fontSize: 20, cursor: "pointer" }}
                  className={darkMode ? "text-gray-200" : "text-gray-700"}
                />
              </Badge>
            </Dropdown>

            {/* Profile */}
            <Dropdown overlay={profileMenu} placement="bottomRight" trigger={["click"]}>
              <Avatar style={{ backgroundColor: "#1890ff", cursor: "pointer" }}>U</Avatar>
            </Dropdown>
          </div>
        </Header>

        {/* Main Content */}
        <Content
          style={{
            minHeight: "calc(100vh - 64px)",
            background: darkMode ? "#1f2937" : "#f9fafb", // gray-800 / gray-50
          }}
          className="p-6"
        >
          <div
            className={`shadow-md rounded-xl p-6 min-h-[70vh] transition-colors duration-200 ${
              darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
            }`}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

