import type {
  ResetPasswordPayload,
  ResetPasswordResponse,
} from "../schemas/authSchema";
import { useMutation } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import {
  resetPasswordPayloadSchema,
  resetPasswordResponseSchema,
} from "../schemas/authSchema";

export const useResetPassword = () => {
  return useMutation<ResetPasswordResponse, Error, ResetPasswordPayload>({
    mutationFn: async (payload: ResetPasswordPayload) => {
      const validatedPayload =
        await resetPasswordPayloadSchema.validate(payload);
      const response = await authService.resetPassword(validatedPayload);
      return await resetPasswordResponseSchema.validate(response);
    },
  });
};
