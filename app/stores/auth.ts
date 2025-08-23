// stores/auth.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import apiService from '../services/api';
import type { AuthState } from '../types/auth';

export const useAuth = defineStore('auth', () => {
  // State
  const isAuthenticated = ref(false);
  const token = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const authState = computed(
    (): AuthState => ({
      isAuthenticated: isAuthenticated.value,
      token: token.value,
      expiresAt: null,
    }),
  );

  const canAccessLauncher = computed(() => isAuthenticated.value);

  // Private methods
  const handleTokenExpired = () => {
    logout(false);
  };

  const showNotification = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('show-notification', {
          detail: { message, type },
        }),
      );
    }
  };

  // Actions
  const initialize = async () => {
    try {
      isLoading.value = true;

      // Check existing authentication
      isAuthenticated.value = apiService.isAuthenticated();
      token.value = apiService.getToken();

      // Setup token expiry listener (browser only)
      if (typeof window !== 'undefined') {
        window.removeEventListener('token-expired', handleTokenExpired);
        window.addEventListener('token-expired', handleTokenExpired);
      }
    } catch (err) {
      console.error('Auth initialization failed:', err);
      isAuthenticated.value = false;
      token.value = null;
    } finally {
      isLoading.value = false;
    }
  };

  const login = async (credentials: { username: string; password: string }) => {
    try {
      isLoading.value = true;
      error.value = null;

      const response = await apiService.login(credentials);

      isAuthenticated.value = true;
      token.value = response.access_token;

      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      error.value = errorMessage;
      throw err;
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async (callApi = true) => {
    try {
      if (callApi) {
        isLoading.value = true;
        error.value = null;
        await apiService.logout();
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Logout failed';
      error.value = errorMessage;
      if (callApi) {
        throw err;
      }
    } finally {
      // Always reset state
      isAuthenticated.value = false;
      token.value = null;
      isLoading.value = false;

      // Cleanup listeners
      if (typeof window !== 'undefined') {
        window.removeEventListener('token-expired', handleTokenExpired);
      }
    }
  };

  const clearError = () => {
    error.value = null;
  };

  const cleanup = () => {
    if (typeof window !== 'undefined') {
      window.removeEventListener('token-expired', handleTokenExpired);
    }
  };

  return {
    // State
    isAuthenticated,
    token,
    isLoading,
    error,

    // Getters
    authState,
    canAccessLauncher,

    // Actions
    initialize,
    login,
    logout,
    clearError,
    cleanup,
  };
});
