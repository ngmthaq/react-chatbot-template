import type {
  PaginationPayload,
  PaginatedResponse,
  Conversation,
  Message,
  SendMessagePayload,
  MessageServiceType,
} from "@/core/schemas/messageSchema";
import { api } from "@/core/utils/api";

class MessageService implements MessageServiceType {
  async getConversations(
    pagination: PaginationPayload,
  ): Promise<PaginatedResponse<Conversation>> {
    const response = await api.get("/conversations", pagination);
    return response.data;
  }

  async getMessages(
    conversationId: string,
    pagination: PaginationPayload,
  ): Promise<PaginatedResponse<Message>> {
    const response = await api.get(
      `/conversations/${conversationId}/messages`,
      pagination,
    );
    return response.data;
  }

  async sendMessage(payload: SendMessagePayload): Promise<Message> {
    const response = await api.post("/messages", payload);
    return response.data;
  }
}

export const messageService = new MessageService();
