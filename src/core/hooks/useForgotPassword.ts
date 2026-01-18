import { useMutation } from "@tanstack/react-query";
import {
  forgotPasswordResponseSchema,
  type ForgotPasswordResponse,
} from "../schemas";
import { authService } from "../services";

export const useForgotPassword = () => {
  return useMutation<ForgotPasswordResponse, Error, string>({
    mutationFn: async (email: string) => {
      const response = await authService.forgotPassword(email);
      return await forgotPasswordResponseSchema.validate(response);
    },
  });
};
