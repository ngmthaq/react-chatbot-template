import { useMutation } from "@tanstack/react-query";
import {
  registerPayloadSchema,
  registerResponseSchema,
  type RegisterPayload,
  type RegisterResponse,
} from "../schemas";
import { authService } from "../services";

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: async (payload: RegisterPayload) => {
      const validatedPayload = await registerPayloadSchema.validate(payload);
      const response = await authService.register(validatedPayload);
      return await registerResponseSchema.validate(response);
    },
  });
};
