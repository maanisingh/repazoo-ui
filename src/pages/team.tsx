import React, { useState } from "react";
import { Card, Table, Tag, Button, Space, Modal, Select, Form, Input, message, Alert } from "antd";
import { useList, useUpdate, useDelete, useCreate } from "@refinedev/core";
import { UserOutlined, DeleteOutlined, RedoOutlined, PlusOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export const TeamPage: React.FC = () => {
  const { data: teamData, isLoading } = useList({
    resource: "team-members",
    pagination: { pageSize: 20 },
    sorters: [{ field: "createdAt", order: "asc" }],
  });

  const { data: subData } = useList({
    resource: "subscriptions",
    pagination: { pageSize: 1 },
  });
  const subscription = subData?.data?.[0];

  const { mutate: updateMember } = useUpdate();
  const { mutate: deleteMember } = useDelete();
  const { mutate: createMember } = useCreate();

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);

  const team = teamData?.data || [];

  // Invite Member
  const handleInvite = (values: any) => {
    if (subscription?.seatsUsed >= subscription?.seatLimit) {
      message.error("Seat limit reached. Upgrade plan to add more members.");
      return;
    }
    createMember(
      {
        resource: "team-members",
        values: {
          email: values.email,
          role: values.role,
          status: "invited",
        },
      },
      {
        onSuccess: () => {
          message.success(`Invitation sent to ${values.email}`);
          setIsInviteModalOpen(false);
        },
        onError: () => message.error("Failed to invite member"),
      }
    );
  };

  // Role Change
  const handleChangeRole = (member: any) => {
    setSelectedMember(member);
    setIsRoleModalOpen(true);
  };

  const confirmRoleChange = (role: string) => {
    if (!selectedMember) return;
    updateMember(
      {
        resource: "team-members",
        id: selectedMember.id,
        values: { role },
      },
      {
        onSuccess: () => {
          message.success(`Role updated to ${role}`);
          setIsRoleModalOpen(false);
        },
        onError: () => message.error("Failed to update role"),
      }
    );
  };

  // Remove Member
  const handleRemove = (id: number) => {
    deleteMember(
      { resource: "team-members", id },
      {
        onSuccess: () => message.success("Member removed"),
        onError: () => message.error("Failed to remove member"),
      }
    );
  };

  // Resend Invite
  const handleResendInvite = (member: any) => {
    message.info(`Resent invite to ${member.email}`);
    // TODO: integrate with n8n/email service + Strapi notifications
  };

  const columns = [
    {
      title: "Name",
      dataIndex: ["user", "name"],
      key: "name",
      render: (text: string) => (
        <span>
          <UserOutlined className="mr-2" />
          {text || "—"}
        </span>
      ),
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
      render: (role: string, record: any) => (
        <Button type="link" onClick={() => handleChangeRole(record)}>
          <Tag color={role === "admin" ? "red" : role === "analyst" ? "blue" : "green"}>
            {role}
          </Tag>
        </Button>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => (
        <Tag color={status === "active" ? "green" : "orange"}>{status}</Tag>
      ),
    },
    {
      title: "Last Login",
      dataIndex: "lastLogin",
      key: "lastLogin",
      render: (val: string) => (val ? new Date(val).toLocaleString() : "Never"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_: any, record: any) => (
        <Space>
          {record.status === "invited" && (
            <Button icon={<RedoOutlined />} onClick={() => handleResendInvite(record)}>
              Resend Invite
            </Button>
          )}
          <Button danger icon={<DeleteOutlined />} onClick={() => handleRemove(record.id)}>
            Remove
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Seat Limit Banner */}
      {subscription && subscription.seatsUsed >= subscription.seatLimit && (
        <Alert
          message="Seat Limit Reached"
          description={
            <span>
              You’ve reached your seat limit ({subscription.seatsUsed}/{subscription.seatLimit}).{" "}
              <Link to="/settings">Upgrade your plan</Link> to add more team members.
            </span>
          }
          type="warning"
          showIcon
          className="mb-4"
        />
      )}

      <Card className="shadow rounded-xl">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-xl font-bold">Team Members</h1>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsInviteModalOpen(true)}>
            Invite Member
          </Button>
        </div>

        <Table
          loading={isLoading}
          rowKey="id"
          columns={columns}
          dataSource={team}
          pagination={{ pageSize: 20 }}
          className="rounded-xl shadow"
        />
      </Card>

      {/* Role Change Modal */}
      <Modal
        title={`Change Role for ${selectedMember?.email}`}
        open={isRoleModalOpen}
        onCancel={() => setIsRoleModalOpen(false)}
        footer={null}
      >
        <Select
          className="w-full"
          defaultValue={selectedMember?.role}
          onChange={confirmRoleChange}
          options={[
            { label: "Admin", value: "admin" },
            { label: "Analyst", value: "analyst" },
            { label: "Viewer", value: "viewer" },
          ]}
        />
      </Modal>

      {/* Invite Member Modal */}
      <Modal
        title="Invite New Team Member"
        open={isInviteModalOpen}
        onCancel={() => setIsInviteModalOpen(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleInvite}>
          <Form.Item label="Email" name="email" rules={[{ required: true, type: "email" }]}>
            <Input placeholder="newuser@example.com" />
          </Form.Item>
          <Form.Item label="Role" name="role" rules={[{ required: true }]}>
            <Select
              placeholder="Select role"
              options={[
                { label: "Admin", value: "admin" },
                { label: "Analyst", value: "analyst" },
                { label: "Viewer", value: "viewer" },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Send Invite
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
