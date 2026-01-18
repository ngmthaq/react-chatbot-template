import { useMutation } from "@tanstack/react-query";
import {
  messageSchema,
  sendMessagePayloadSchema,
  type Message,
  type SendMessagePayload,
} from "../schemas";
import { messageService } from "../services";

export const useSendMessage = () => {
  return useMutation<Message, Error, SendMessagePayload>({
    mutationFn: async (payload: SendMessagePayload) => {
      const validatedPayload = await sendMessagePayloadSchema.validate(payload);
      const response = await messageService.sendMessage(validatedPayload);
      return await messageSchema.validate(response);
    },
  });
};
