import { AuthBindings } from "@refinedev/core";

export const AuthProvider: AuthBindings = {
  login: async ({ email }) => {
    localStorage.setItem("token", "fake-token");
    localStorage.setItem("user", JSON.stringify({ id: 1, username: "Demo User", email }));
    return { success: true, redirectTo: "/dashboard" };
  },
  register: async () => ({ success: true, redirectTo: "/dashboard" }),
  logout: async () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return { success: true, redirectTo: "/login" };
  },
  check: async () => {
    return localStorage.getItem("token")
      ? { authenticated: true }
      : { authenticated: false, redirectTo: "/login" };
  },
  getPermissions: async () => "user",
  getIdentity: async () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

