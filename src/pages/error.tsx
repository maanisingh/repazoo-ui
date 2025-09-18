import React, { useEffect } from "react";
import { Button, Result } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { useCreate } from "@refinedev/core";

export const ErrorPage: React.FC<{ code?: number; message?: string }> = ({
  code = 404,
  message = "The page you are looking for doesn't exist or has been moved.",
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: createErrorLog } = useCreate();

  // Log error path in Strapi
  useEffect(() => {
    createErrorLog({
      resource: "error-logs",
      values: {
        path: location.pathname,
        code,
        message,
        timestamp: new Date().toISOString(),
      },
    });
  }, [location.pathname]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <Result
        status={code === 404 ? "404" : "500"}
        title={code === 404 ? "Page Not Found" : "Something Went Wrong"}
        subTitle={message}
        extra={[
          <Button type="primary" key="dashboard" onClick={() => navigate("/dashboard")}>
            Go to Dashboard
          </Button>,
          <Button key="support" onClick={() => navigate("/support")}>
            Contact Support
          </Button>,
          <Button key="back" onClick={() => navigate(-1)}>
            Go Back
          </Button>,
        ]}
      />
    </div>
  );
};
