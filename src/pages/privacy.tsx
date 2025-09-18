import React from "react";
import { Card, Typography, Button } from "antd";
import { LockOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

export const PrivacyPage: React.FC = () => {
  return (
    <div className="p-6">
      <Card className="rounded-xl shadow p-6">
        <Title level={3} className="flex items-center gap-2">
          <LockOutlined /> Privacy Policy
        </Title>

        <Paragraph>
          Repazoo respects your privacy and is committed to protecting your personal data. 
          This Privacy Policy explains what information we collect, how we use it, and 
          your rights under GDPR, CCPA, and other regulations.
        </Paragraph>

        <Paragraph strong>1. Data We Collect</Paragraph>
        <Paragraph>
          We collect account details (name, email), reputation-related content, and usage logs 
          for service improvement.
        </Paragraph>

        <Paragraph strong>2. Data Usage</Paragraph>
        <Paragraph>
          Data is used to deliver services, improve features, and comply with legal requirements. 
          We do not sell personal data to third parties.
        </Paragraph>

        <Paragraph strong>3. User Rights</Paragraph>
        <Paragraph>
          Under GDPR/CCPA, you have the right to access, correct, or delete your data. 
          Requests can be made via your account or our Support page.
        </Paragraph>

        <Paragraph strong>4. Data Retention</Paragraph>
        <Paragraph>
          We retain data only as long as necessary to provide services or as required by law.
        </Paragraph>

        <Paragraph>
          For more information, see{" "}
          <a href="https://ico.org.uk/" target="_blank" rel="noreferrer">
            UK Information Commissioner’s Office
          </a>
          ,{" "}
          <a href="https://gdpr.eu/" target="_blank" rel="noreferrer">
            GDPR Portal
          </a>
          , or{" "}
          <a href="https://www.ftc.gov/" target="_blank" rel="noreferrer">
            US Federal Trade Commission
          </a>.
        </Paragraph>

        <Link to="/settings">
          <Button type="link" icon={<ArrowLeftOutlined />}>
            Back to Settings
          </Button>
        </Link>
      </Card>
    </div>
  );
};
