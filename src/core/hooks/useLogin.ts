import { useMutation } from "@tanstack/react-query";
import {
  loginCredentialsSchema,
  loginResponseSchema,
  type LoginCredentials,
  type LoginResponse,
} from "../schemas";
import { authService } from "../services";

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginCredentials>({
    mutationFn: async (payload: LoginCredentials) => {
      const validatedPayload = await loginCredentialsSchema.validate(payload);
      const response = await authService.login(validatedPayload);
      return await loginResponseSchema.validate(response);
    },
  });
};
