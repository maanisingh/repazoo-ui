import React, { useState } from "react";
import {
  Card,
  Input,
  Collapse,
  Button,
  Form,
  message,
  Tabs,
  List,
  Tag,
} from "antd";
import { useList, useCreate } from "@refinedev/core";
import {
  QuestionCircleOutlined,
  CustomerServiceOutlined,
  FileProtectOutlined,
  BellOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Panel } = Collapse;

export const SupportPage: React.FC = () => {
  const [form] = Form.useForm();

  // FAQs
  const { data: faqData, isLoading: faqLoading } = useList({
    resource: "faqs",
    pagination: { pageSize: 20 },
  });
  const faqs = faqData?.data || [];

  // Support Tickets
  const { mutate: createTicket } = useCreate();

  const handleSubmitTicket = (values: any) => {
    createTicket(
      {
        resource: "support-tickets",
        values: {
          subject: values.subject,
          description: values.description,
          status: "open",
        },
      },
      {
        onSuccess: () => {
          message.success("Support ticket submitted");
          form.resetFields();
        },
        onError: () => message.error("Failed to submit ticket"),
      }
    );
  };

  return (
    <div className="p-6 space-y-6">
      <Card className="rounded-xl shadow">
        <h1 className="text-xl font-bold flex items-center gap-2 mb-4">
          <CustomerServiceOutlined /> Support & Help Center
        </h1>

        <Tabs
          defaultActiveKey="faqs"
          items={[
            {
              key: "faqs",
              label: (
                <span>
                  <QuestionCircleOutlined /> FAQs
                </span>
              ),
              children: (
                <div>
                  <Input.Search
                    placeholder="Search FAQs..."
                    className="mb-4"
                    allowClear
                  />
                  <Collapse accordion>
                    {faqs.map((f: any) => (
                      <Panel header={f.question} key={f.id}>
                        <p>{f.answer}</p>
                        <Tag color="blue">{f.category || "General"}</Tag>
                      </Panel>
                    ))}
                  </Collapse>
                </div>
              ),
            },
            {
              key: "tickets",
              label: (
                <span>
                  <CustomerServiceOutlined /> Contact Support
                </span>
              ),
              children: (
                <Form form={form} layout="vertical" onFinish={handleSubmitTicket}>
                  <Form.Item
                    label="Subject"
                    name="subject"
                    rules={[{ required: true }]}
                  >
                    <Input placeholder="Short subject line" />
                  </Form.Item>
                  <Form.Item
                    label="Description"
                    name="description"
                    rules={[{ required: true }]}
                  >
                    <Input.TextArea rows={4} placeholder="Describe your issue..." />
                  </Form.Item>
                  <Button type="primary" htmlType="submit">
                    Submit Ticket
                  </Button>
                </Form>
              ),
            },
            {
              key: "resources",
              label: (
                <span>
                  <FileProtectOutlined /> Resources
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
                  <Link to="/notifications">
                    <Button type="link" icon={<BellOutlined />}>
                      View Notifications
                    </Button>
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
