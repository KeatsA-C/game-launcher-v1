// services/api.ts
import type { LoginResponse, LogoutResponse, GameListResponse } from '../types/auth';

interface LauncherResponse {
  code: string;
  launchUri: string;
}

interface DownloadResponse {
  ok: boolean;
  url: string;
  expires: number;
}

interface StorageManager {
  get(key: string): string | null;
  set(key: string, value: string): void;
  remove(key: string): void;
  clear(): void;
}

class BrowserStorage implements StorageManager {
  get(key: string): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem(key);
  }

  set(key: string, value: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem(key, value);
  }

  remove(key: string): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(key);
  }

  clear(): void {
    if (typeof window === 'undefined') return;
    localStorage.clear();
  }
}

class ApiService {
  private baseURL: string;
  private token: string | null = null;
  private tokenExpiryTimeout: NodeJS.Timeout | null = null;
  private launcherCode: string | null = null;
  private storage: StorageManager;

  private readonly STORAGE_KEYS = {
    AUTH_TOKEN: 'auth_token',
    TOKEN_EXPIRY: 'token_expiry',
    LAUNCHER_CODE: 'launcher_code',
  } as const;

  constructor(baseURL: string, storage?: StorageManager) {
    this.baseURL = baseURL.replace(/\/$/, '');
    this.storage = storage || new BrowserStorage();
    this.initializeFromStorage();
  }

  private initializeFromStorage(): void {
    this.loadStoredToken();
    this.loadStoredLauncherCode();
  }

  private loadStoredToken(): void {
    const storedToken = this.storage.get(this.STORAGE_KEYS.AUTH_TOKEN);
    const storedExpiry = this.storage.get(this.STORAGE_KEYS.TOKEN_EXPIRY);

    if (storedToken && storedExpiry) {
      const expiryTime = parseInt(storedExpiry, 10);
      if (Date.now() < expiryTime) {
        this.token = storedToken;
        this.scheduleTokenExpiry(expiryTime - Date.now());
      } else {
        this.clearStoredToken();
      }
    }
  }

  private loadStoredLauncherCode(): void {
    const storedCode = this.storage.get(this.STORAGE_KEYS.LAUNCHER_CODE);
    if (storedCode) {
      this.launcherCode = storedCode;
    }
  }

  private storeToken(token: string, expiresIn: number): void {
    this.token = token;
    const expiryTime = Date.now() + expiresIn * 1000;

    this.storage.set(this.STORAGE_KEYS.AUTH_TOKEN, token);
    this.storage.set(this.STORAGE_KEYS.TOKEN_EXPIRY, expiryTime.toString());

    this.scheduleTokenExpiry(expiresIn * 1000);
  }

  private storeLauncherCode(code: string): void {
    this.launcherCode = code;
    this.storage.set(this.STORAGE_KEYS.LAUNCHER_CODE, code);
  }

  private clearStoredToken(): void {
    this.token = null;
    this.storage.remove(this.STORAGE_KEYS.AUTH_TOKEN);
    this.storage.remove(this.STORAGE_KEYS.TOKEN_EXPIRY);

    if (this.tokenExpiryTimeout) {
      clearTimeout(this.tokenExpiryTimeout);
      this.tokenExpiryTimeout = null;
    }
  }

  private clearLauncherCode(): void {
    this.launcherCode = null;
    this.storage.remove(this.STORAGE_KEYS.LAUNCHER_CODE);
  }

  private scheduleTokenExpiry(milliseconds: number): void {
    if (this.tokenExpiryTimeout) {
      clearTimeout(this.tokenExpiryTimeout);
    }

    this.tokenExpiryTimeout = setTimeout(() => {
      this.handleTokenExpiry();
    }, milliseconds);
  }

  private handleTokenExpiry(): void {
    this.clearStoredToken();
    this.clearLauncherCode();

    // Emit token expiry event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('token-expired'));
    }
  }

  private async makeRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add authorization header for protected endpoints
    if (this.token && !endpoint.includes('/auth/login')) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${this.token}`,
      };
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          this.handleTokenExpiry();
          throw new Error('Authentication required');
        }
        throw new Error(data.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network request failed');
    }
  }

  private executeLaunchUri(launchUri: string): void {
    if (typeof window === 'undefined') {
      throw new Error('Launch URI execution not supported in server environment');
    }

    try {
      // Primary method: temporary anchor element
      const link = document.createElement('a');
      link.href = launchUri;
      link.style.display = 'none';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Primary launch method failed:', error);

      // Fallback: window.location
      try {
        window.location.href = launchUri;
      } catch (fallbackError) {
        console.error('Fallback launch method failed:', fallbackError);
        throw new Error(
          'Failed to launch application: browser may have blocked the custom protocol',
        );
      }
    }
  }

  private triggerDownload(url: string, filename: string): void {
    if (typeof window === 'undefined') {
      throw new Error('Download not supported in server environment');
    }

    try {
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.target = '_blank';
      link.rel = 'noopener';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Download failed:', error);
      throw new Error('Failed to trigger download');
    }
  }

  // Public API methods
  async login(credentials: { username?: string; password: string }): Promise<LoginResponse> {
    try {
      const response = await this.makeRequest<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });

      this.storeToken(response.access_token, response.expires_in);
      return response;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Login failed');
    }
  }

  async logout(): Promise<LogoutResponse> {
    try {
      const response = await this.makeRequest<LogoutResponse>('/auth/logout', {
        method: 'POST',
      });

      this.clearStoredToken();
      this.clearLauncherCode();
      return response;
    } catch (error) {
      // Always clear local data even if server request fails
      this.clearStoredToken();
      this.clearLauncherCode();
      throw new Error(error instanceof Error ? error.message : 'Logout failed');
    }
  }

  async getGameList(params?: { page?: number; limit?: number }): Promise<GameListResponse> {
    try {
      let endpoint = '/game/list';

      if (params) {
        const queryParams = new URLSearchParams();
        if (params.page) queryParams.append('page', params.page.toString());
        if (params.limit) queryParams.append('limit', params.limit.toString());

        const queryString = queryParams.toString();
        if (queryString) {
          endpoint += `?${queryString}`;
        }
      }

      return await this.makeRequest<GameListResponse>(endpoint);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to fetch game list');
    }
  }

  async runLauncher(): Promise<void> {
    if (!this.token) {
      throw new Error('Authentication required to run launcher');
    }

    try {
      const response = await this.makeRequest<LauncherResponse>('/launcher/run', {
        method: 'POST',
      });

      this.storeLauncherCode(response.code);
      this.executeLaunchUri(response.launchUri);
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to run launcher');
    }
  }

  async runGame(gameId: string, gameName: string): Promise<void> {
    if (!this.token) {
      throw new Error('Authentication required to run game');
    }

    if (!this.launcherCode) {
      throw new Error('Launcher code not found. Please run launcher first.');
    }

    try {
      const response = await this.makeRequest('/launcher/commands', {
        method: 'POST',
        body: JSON.stringify({
          code: this.launcherCode,
          type: 'runGame',
          payload: {
            id: gameId,
            name: gameName,
          },
        }),
      });

      // return response;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to run game');
    }
  }

  // File Download Methods
  async downloadFile(key: string, filename?: string): Promise<void> {
    if (!this.token) {
      throw new Error('Authentication required to download files');
    }

    try {
      const response = await this.makeRequest<DownloadResponse>(
        `/file/download?key=${encodeURIComponent(key)}`,
      );

      if (response.ok && response.url) {
        const downloadFilename = filename || key.split('/').pop() || 'download';
        this.triggerDownload(response.url, downloadFilename);
      } else {
        throw new Error('Invalid download response');
      }
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to download file');
    }
  }

  async downloadLauncher(): Promise<void> {
    if (!this.token) {
      throw new Error('Authentication required to download launcher');
    }

    try {
      await this.downloadFile('uploads/Game.msi', 'launcher.exe');
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to download launcher');
    }
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!this.token;
  }

  getToken(): string | null {
    return this.token;
  }

  getLauncherCode(): string | null {
    return this.launcherCode;
  }

  // Cleanup method
  cleanup(): void {
    if (this.tokenExpiryTimeout) {
      clearTimeout(this.tokenExpiryTimeout);
      this.tokenExpiryTimeout = null;
    }
  }
}

// Create and export singleton instance
const apiService = new ApiService(
  import.meta.env.VUE_APP_BASE_URL || process.env.VUE_APP_BASE_URL || 'http://localhost:3000',
);

export default apiService;
