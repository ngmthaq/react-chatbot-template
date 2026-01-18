import { useMutation } from "@tanstack/react-query";
import {
  resetPasswordPayloadSchema,
  resetPasswordResponseSchema,
  type ResetPasswordPayload,
  type ResetPasswordResponse,
} from "../schemas";
import { authService } from "../services";

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
