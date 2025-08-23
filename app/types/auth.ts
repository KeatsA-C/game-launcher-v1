// types/auth.ts

// API Response Types
export interface LoginResponse {
  access_token: string;
  expires_in: number;
  token_type?: string;
  refresh_token?: string;
}

export interface LogoutResponse {
  message: string;
}

export interface ErrorResponse {
  message: string;
  error: string;
  statusCode: number;
}
// Add this interface to your types/auth.ts file:
export interface DownloadResponse {
  ok: boolean;
  url: string;
  expires: number;
}
// Game Types
export interface Game {
  id: string;
  name: string;
  description: string;
  version?: string;
  size?: string;
  coverImage?: string;
  screenshots?: string[];
}

export type GameListResponse = Game[];

// Auth State Types
export interface AuthState {
  isAuthenticated: boolean;
  token: string | null;
  expiresAt: number | null;
}

// Notification Types
export interface NotificationDetail {
  message: string;
  type: 'success' | 'error' | 'warning';
}

export interface NotificationEvent extends CustomEvent {
  detail: NotificationDetail;
}

// Component Props Types
export interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'warning';
  duration?: number;
}

export interface GameCardProps {
  gameName: string;
  gameDetails: string;
  gameImage: string;
  previewImage?: string;
}

// Launcher Types
export interface LauncherState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

// API Service Types
export interface ApiCredentials {
  username?: string;
  password: string;
}

export interface GameListParams {
  page?: number;
  limit?: number;
}

export interface LauncherResponse {
  code: string;
  launchUri: string;
}

// Storage Interface
export interface StorageManager {
  get(key: string): string | null;
  set(key: string, value: string): void;
  remove(key: string): void;
  clear(): void;
}
