import { API_ENDPOINTS } from "@/core/constants";
import type {
  LoginCredentials,
  LoginResponse,
  RegisterPayload,
  RegisterResponse,
  ForgotPasswordResponse,
  ResetPasswordPayload,
  ResetPasswordResponse,
  UserProfile,
  AuthServiceType,
} from "@/core/schemas";
import { api } from "@/core/utils";

class AuthService implements AuthServiceType {
  async login(payload: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post(API_ENDPOINTS.auth.login, payload);
    return response.data;
  }

  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    const response = await api.post(API_ENDPOINTS.auth.register, payload);
    return response.data;
  }

  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    const response = await api.post(API_ENDPOINTS.auth.forgotPassword, {
      email,
    });
    return response.data;
  }

  async resetPassword(
    payload: ResetPasswordPayload,
  ): Promise<ResetPasswordResponse> {
    const response = await api.post(API_ENDPOINTS.auth.resetPassword, payload);
    return response.data;
  }

  async checkAuth(): Promise<boolean> {
    const response = await api.get(API_ENDPOINTS.auth.checkAuth);
    return response.data;
  }

  async getUserProfilele(): Promise<UserProfile> {
    const response = await api.get(API_ENDPOINTS.auth.profile);
    return response.data;
  }
}

export const authService = new AuthService();
