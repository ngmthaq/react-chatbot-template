import * as yup from "yup";

// Pagination Schemas
export const paginationPayloadSchema = yup.object({
  page: yup.number().required(),
  size: yup.number().required(),
});

export const paginatedResponseSchema = <T extends yup.AnyObjectSchema>(
  itemSchema: T,
) =>
  yup.object({
    data: yup.array().of(itemSchema).required(),
    total: yup.number().required(),
    page: yup.number().required(),
    size: yup.number().required(),
  });

// Conversation Schema
export const conversationSchema = yup.object({
  id: yup.string().required(),
  title: yup.string().required(),
  lastMessage: yup.string().required(),
});

// Message Schema
export const messageSchema = yup.object({
  id: yup.string().required(),
  type: yup
    .string()
    .oneOf(["text", "image", "video"] as const)
    .required(),
  content: yup.mixed<string | Blob>().required(),
  timestamp: yup.string().required(),
  senderType: yup
    .string()
    .oneOf(["user", "bot"] as const)
    .required(),
});

// Send Message Schema
export const sendMessagePayloadSchema = yup.object({
  conversationId: yup.string().optional(),
  message: yup
    .object({
      type: yup
        .string()
        .oneOf(["text", "image", "video"] as const)
        .required(),
      content: yup.mixed<string | Blob>().required(),
    })
    .required(),
});

// Inferred Types
export type PaginationPayload = yup.InferType<typeof paginationPayloadSchema>;
export type Conversation = yup.InferType<typeof conversationSchema>;
export type Message = yup.InferType<typeof messageSchema>;
export type SendMessagePayload = yup.InferType<typeof sendMessagePayloadSchema>;

// PaginatedResponse type helper
export type PaginatedResponse<T> = {
  data: T[];
  total: number;
  page: number;
  size: number;
};

// Message Service Type
export type MessageServiceType = {
  getConversations: (
    pagination: PaginationPayload,
  ) => Promise<PaginatedResponse<Conversation>>;
  getMessages: (
    conversationId: string,
    pagination: PaginationPayload,
  ) => Promise<PaginatedResponse<Message>>;
  sendMessage: (payload: SendMessagePayload) => Promise<Message>;
};
