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
} from "@/core/schemas/authSchema";
import { api } from "@/core/utils/api";

class AuthService implements AuthServiceType {
  async login(payload: LoginCredentials): Promise<LoginResponse> {
    const response = await api.post("/auth/login", payload);
    return response.data;
  }

  async register(payload: RegisterPayload): Promise<RegisterResponse> {
    const response = await api.post("/auth/register", payload);
    return response.data;
  }

  async forgotPassword(email: string): Promise<ForgotPasswordResponse> {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  }

  async resetPassword(
    payload: ResetPasswordPayload,
  ): Promise<ResetPasswordResponse> {
    const response = await api.post("/auth/reset-password", payload);
    return response.data;
  }

  async checkAuth(): Promise<boolean> {
    const response = await api.get("/auth/check");
    return response.data;
  }

  async getUserProfilele(): Promise<UserProfile> {
    const response = await api.get("/auth/profile");
    return response.data;
  }
}

export const authService = new AuthService();
