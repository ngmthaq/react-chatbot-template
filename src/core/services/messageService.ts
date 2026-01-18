import { API_ENDPOINTS } from "@/core/constants";
import type {
  PaginationPayload,
  PaginatedResponse,
  Conversation,
  Message,
  SendMessagePayload,
  MessageServiceType,
} from "@/core/schemas";
import { api } from "@/core/utils";

class MessageService implements MessageServiceType {
  async getConversations(
    pagination: PaginationPayload,
  ): Promise<PaginatedResponse<Conversation>> {
    const response = await api.get(
      API_ENDPOINTS.conversations.list,
      pagination,
    );
    return response.data;
  }

  async getMessages(
    conversationId: string,
    pagination: PaginationPayload,
  ): Promise<PaginatedResponse<Message>> {
    const response = await api.get(
      API_ENDPOINTS.conversations.messages.replace(":id", conversationId),
      pagination,
    );
    return response.data;
  }

  async sendMessage(payload: SendMessagePayload): Promise<Message> {
    const response = await api.post(API_ENDPOINTS.messages.send, payload);
    return response.data;
  }
}

export const messageService = new MessageService();
