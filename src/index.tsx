import React from "react";
import ReactDOM from "react-dom/client";
import { Refine } from "@refinedev/core";
import { useNotificationProvider, RefineThemes } from "@refinedev/antd";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ConfigProvider } from "antd";
import "antd/dist/reset.css";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ConfigProvider theme={RefineThemes.Blue}>
        <Refine
          notificationProvider={useNotificationProvider}
          /* Add dataProvider + authProvider when backend is ready */
        >
          <App />
        </Refine>
      </ConfigProvider>
    </BrowserRouter>
  </React.StrictMode>
);

