import { queryOptions, useQuery } from "@tanstack/react-query";
import { queryKeys } from "../constants";
import { conversationSchema, type PaginationPayload } from "../schemas";
import { messageService } from "../services";

export const getConversationsOptions = (pagination: PaginationPayload) =>
  queryOptions({
    queryKey: queryKeys.conversations.list(pagination.page, pagination.size),
    queryFn: async () => {
      const response = await messageService.getConversations(pagination);
      return {
        ...response,
        data: await Promise.all(
          response.data.map((item) => conversationSchema.validate(item)),
        ),
      };
    },
  });

export const useGetConversations = (
  pagination: PaginationPayload,
  enabled = true,
) => {
  return useQuery({ ...getConversationsOptions(pagination), enabled });
};
