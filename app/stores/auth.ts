import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuth = defineStore('auth', () => {
  const isAuthenticated = ref(false);
  const token = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const login = async (credentials: { username: string; password: string }) => {
    isLoading.value = true;
    error.value = null;
    isAuthenticated.value = true;
    isLoading.value = false;
  };

  const logout = async (callApi = true) => {
    isLoading.value = true;
    error.value = null;
    isAuthenticated.value = false;
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    isAuthenticated,

    isLoading,

    login,
    logout,
  };
});
