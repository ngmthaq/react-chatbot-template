import type { PaginationPayload } from "../schemas/messageSchema";
import { useQuery, queryOptions } from "@tanstack/react-query";
import { queryKeys } from "@/core/constants/queryKeys";
import { messageService } from "@/services/messageService";
import { messageSchema } from "../schemas/messageSchema";

export const getMessagesOptions = (
  conversationId: string,
  pagination: PaginationPayload,
) =>
  queryOptions({
    queryKey: queryKeys.messages.list(
      conversationId,
      pagination.page,
      pagination.size,
    ),
    queryFn: async () => {
      const response = await messageService.getMessages(
        conversationId,
        pagination,
      );
      return {
        ...response,
        data: await Promise.all(
          response.data.map((item) => messageSchema.validate(item)),
        ),
      };
    },
  });

export const useGetMessages = (
  conversationId: string,
  pagination: PaginationPayload,
  enabled = true,
) => {
  return useQuery({
    ...getMessagesOptions(conversationId, pagination),
    enabled,
  });
};
