type Role = 'ROLE_USER' | 'ROLE_ADMIN';
type Provider = 'NONE' | 'GOOGLE' | 'NAVER' | 'KAKAO';

export type User = {
  id: string;
  email: string;
  phoneNumber: string | null;
  role: Role;
  isPetInitiatedLetterEnabled: boolean;
};

export interface UserRequestData {
  email: string;
}

export interface LoginRequest extends UserRequestData {
  password: string;
}

export interface TokenResponse {
  token: string;
}

export interface PasswordRequest {
  password?: string | null;
  newPassword: string;
}

export interface PhoneNumberRequest {
  phoneNumber: string;
}

export interface UserInfoResponse {
  id: number;
  email: string;
  phoneNumber: string;
  role: Role;
  provider: Provider;
  lastLoggedIn?: string;
  lastChangedPassword: string;
  createdAt: string;
}

export interface ErrorData {
  code?: string;
  message: string;
}
