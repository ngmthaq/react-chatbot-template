import type { LoginCredentials, LoginResponse } from "../schemas/authSchema";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import {
  loginCredentialsSchema,
  loginResponseSchema,
} from "../schemas/authSchema";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (payload: LoginCredentials) => {
      const validatedPayload = await loginCredentialsSchema.validate(payload);
      const response = await authService.login(validatedPayload);
      return await loginResponseSchema.validate(response);
    },
  });
};
