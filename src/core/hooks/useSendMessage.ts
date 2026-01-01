import type { SendMessagePayload, Message } from "../schemas/messageSchema";
import { useMutation } from "@tanstack/react-query";
import { messageService } from "@/services/messageService";
import {
  sendMessagePayloadSchema,
  messageSchema,
} from "../schemas/messageSchema";

export const useSendMessage = () => {
  return useMutation<Message, Error, SendMessagePayload>({
    mutationFn: async (payload: SendMessagePayload) => {
      const validatedPayload = await sendMessagePayloadSchema.validate(payload);
      const response = await messageService.sendMessage(validatedPayload);
      return await messageSchema.validate(response);
    },
  });
};
