import type { RegisterPayload, RegisterResponse } from "../schemas/authSchema";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import {
  registerPayloadSchema,
  registerResponseSchema,
} from "../schemas/authSchema";

export const useRegister = () => {
  return useMutation<RegisterResponse, Error, RegisterPayload>({
    mutationFn: async (payload: RegisterPayload) => {
      const validatedPayload = await registerPayloadSchema.validate(payload);
      const response = await authService.register(validatedPayload);
      return await registerResponseSchema.validate(response);
    },
  });
};
