/**
 * API endpoint constants.
 * Ensure that these endpoints are kept up-to-date with the backend routes.
 */
export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    forgotPassword: "/auth/forgot-password",
    resetPassword: "/auth/reset-password",
    checkAuth: "/auth/check",
    profile: "/auth/profile",
  },
  conversations: {
    list: "/conversations",
    messages: "/conversations/:id/messages",
  },
  messages: {
    send: "/messages",
  },
};
