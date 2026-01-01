import type { ForgotPasswordResponse } from "../schemas/authSchema";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { forgotPasswordResponseSchema } from "../schemas/authSchema";

export const useForgotPassword = () => {
  return useMutation<ForgotPasswordResponse, Error, string>({
    mutationFn: async (email: string) => {
      const response = await authService.forgotPassword(email);
      return await forgotPasswordResponseSchema.validate(response);
    },
  });
};
