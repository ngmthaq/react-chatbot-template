/**
 * Query keys for React Query
 * Used to identify and manage cached queries
 */

export const queryKeys = {
  auth: {
    check: () => ["auth", "check"] as const,
    profile: () => ["auth", "profile"] as const,
    login: () => ["auth", "login"] as const,
    register: () => ["auth", "register"] as const,
    forgotPassword: () => ["auth", "forgotPassword"] as const,
    resetPassword: () => ["auth", "resetPassword"] as const,
  },
  conversations: {
    all: () => ["conversations"] as const,
    list: (page?: number, size?: number) => {
      const key: (string | number)[] = ["conversations"];
      if (page !== undefined) key.push(page);
      if (size !== undefined) key.push(size);
      return key;
    },
  },
  messages: {
    all: (conversationId: string) => ["messages", conversationId] as const,
    list: (conversationId: string, page?: number, size?: number) => {
      const key: (string | number)[] = ["messages", conversationId];
      if (page !== undefined) key.push(page);
      if (size !== undefined) key.push(size);
      return key;
    },
    send: () => ["messages", "send"] as const,
  },
};
