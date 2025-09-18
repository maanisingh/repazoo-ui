import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/AppLayout";

// Core Pages
import { DashboardPage } from "./pages/dashboard";
import { MentionsPage } from "./pages/mentions";
import { ReportsPage } from "./pages/reports";
import { ActionsPage } from "./pages/actions";          // will add placeholder
import { SettingsPage } from "./pages/settings";
import { NotificationsPage } from "./pages/notifications";
import { SupportPage } from "./pages/support";
import { TermsPage } from "./pages/terms";
import { PrivacyPage } from "./pages/privacy";
import { ErrorPage } from "./pages/error";

// Auth Pages
import { LoginPage } from "./pages/login";
import { SignupPage } from "./pages/signup";
import { ForgotPasswordPage } from "./pages/forgot-password";
import { ResetPasswordPage } from "./pages/reset-password";

// Team & Profile
import { TeamPage } from "./pages/team";
import { ProfilePage } from "./pages/profile";          // will add placeholder

export const App = () => {
  return (
      <Routes>
        {/* Public Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Protected App Layout */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="mentions" element={<MentionsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="actions" element={<ActionsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
          <Route path="support" element={<SupportPage />} />
          <Route path="terms" element={<TermsPage />} />
          <Route path="privacy" element={<PrivacyPage />} />
          <Route path="team" element={<TeamPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
  );
};

