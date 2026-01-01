import * as yup from "yup";

// Login Schemas
export const loginCredentialsSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const loginResponseSchema = yup.object({
  success: yup.boolean().required(),
  navigateTo: yup.string().required(),
  data: yup
    .object({
      accessToken: yup.string().required(),
      refreshToken: yup.string().optional(),
    })
    .required(),
});

// Register Schemas
export const registerPayloadSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
  name: yup.string().required(),
});

export const registerResponseSchema = yup.object({
  success: yup.boolean().required(),
  navigateTo: yup.string().required(),
});

// Forgot Password Schema
export const forgotPasswordResponseSchema = yup.object({
  success: yup.boolean().required(),
  navigateTo: yup.string().required(),
});

// Reset Password Schemas
export const resetPasswordPayloadSchema = yup.object({
  token: yup.string().required(),
  newPassword: yup.string().required(),
});

export const resetPasswordResponseSchema = yup.object({
  success: yup.boolean().required(),
  nagivateTo: yup.string().required(),
});

// User Profile Schema
export const userProfileSchema = yup.object({
  id: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
});

// Inferred Types
export type LoginCredentials = yup.InferType<typeof loginCredentialsSchema>;
export type LoginResponse = yup.InferType<typeof loginResponseSchema>;
export type RegisterPayload = yup.InferType<typeof registerPayloadSchema>;
export type RegisterResponse = yup.InferType<typeof registerResponseSchema>;
export type ForgotPasswordResponse = yup.InferType<
  typeof forgotPasswordResponseSchema
>;
export type ResetPasswordPayload = yup.InferType<
  typeof resetPasswordPayloadSchema
>;
export type ResetPasswordResponse = yup.InferType<
  typeof resetPasswordResponseSchema
>;
export type UserProfile = yup.InferType<typeof userProfileSchema>;

// Auth Service Type
export type AuthServiceType = {
  login: (payload: LoginCredentials) => Promise<LoginResponse>;
  register: (payload: RegisterPayload) => Promise<RegisterResponse>;
  forgotPassword: (email: string) => Promise<ForgotPasswordResponse>;
  resetPassword: (
    payload: ResetPasswordPayload,
  ) => Promise<ResetPasswordResponse>;
  checkAuth: () => Promise<boolean>;
  getUserProfilele: () => Promise<UserProfile>;
};
