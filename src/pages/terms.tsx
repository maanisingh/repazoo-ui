import React from "react";
import { Card, Typography, Button } from "antd";
import { FileProtectOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const { Title, Paragraph } = Typography;

export const TermsPage: React.FC = () => {
  return (
    <div className="p-6">
      <Card className="rounded-xl shadow p-6">
        <Title level={3} className="flex items-center gap-2">
          <FileProtectOutlined /> Terms of Service
        </Title>

        <Paragraph>
          Welcome to Repazoo. By using our services, you agree to these Terms of Service. 
          Please read them carefully as they define your rights, responsibilities, and limitations.
        </Paragraph>

        <Paragraph strong>1. Use of Services</Paragraph>
        <Paragraph>
          You agree to use Repazoo only for lawful purposes and in compliance with all 
          applicable regulations. Unauthorized access, scraping, or reverse engineering 
          is strictly prohibited.
        </Paragraph>

        <Paragraph strong>2. Account Responsibilities</Paragraph>
        <Paragraph>
          You are responsible for safeguarding your account credentials and all activities 
          under your account.
        </Paragraph>

        <Paragraph strong>3. Liability Disclaimer</Paragraph>
        <Paragraph>
          Repazoo provides reputation management tools on a best-effort basis. We do not 
          guarantee absolute removal of online content.
        </Paragraph>

        <Paragraph strong>4. Governing Law</Paragraph>
        <Paragraph>
          These Terms are governed by the laws of England & Wales, with disputes subject 
          to exclusive jurisdiction of UK courts.
        </Paragraph>

        <Paragraph>
          For consumer rights information, see{" "}
          <a href="https://www.gov.uk/consumer-protection-rights" target="_blank" rel="noreferrer">
            UK Consumer Rights
          </a>{" "}
          or{" "}
          <a href="https://ec.europa.eu/info/law/law-topic/data-protection_en" target="_blank" rel="noreferrer">
            EU Data Protection
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
