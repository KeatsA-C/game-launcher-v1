<template>
  <div
    class="fixed inset-0 z-50 overflow-y-auto"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <!-- Background overlay -->
    <div
      class="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0"
    >
      <Transition
        enter-active-class="transition-opacity duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition-opacity duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div class="fixed inset-0 bg-slate-900/75 backdrop-blur-sm" @click="$emit('close')"></div>
      </Transition>

      <!-- Center the modal contents -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
        >&#8203;</span
      >

      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        enter-to-class="opacity-100 translate-y-0 sm:scale-100"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0 sm:scale-100"
        leave-to-class="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
      >
        <div
          class="relative inline-block transform overflow-hidden rounded-lg bg-slate-800 border border-slate-700 px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6 sm:align-middle"
        >
          <!-- Close button -->
          <div class="absolute top-0 right-0 pt-4 pr-4">
            <button
              @click="$emit('close')"
              class="text-gray-400 hover:text-gray-300 transition-colors duration-200"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <div>
            <div
              class="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-blue-900/50 mb-4"
            >
              <svg
                class="w-6 h-6 text-blue-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            </div>
            <div class="mt-3 text-center sm:mt-5">
              <h3 class="text-lg leading-6 font-medium text-white" id="modal-title">
                Login to Your Account
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-400">Sign in to access the launcher and your games</p>
              </div>
            </div>
          </div>

          <form @submit.prevent="handleSubmit" class="mt-5 sm:mt-6 space-y-4">
            <!-- Error message -->
            <div v-if="error" class="p-3 bg-red-900/50 border border-red-700 rounded-lg">
              <p class="text-sm text-red-300">{{ error }}</p>
            </div>

            <!-- Username field -->
            <div>
              <label for="username" class="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <input
                id="username"
                v-model="form.username"
                type="text"
                autocomplete="username"
                required
                :disabled="isLoading"
                class="block w-full px-3 py-2 border border-slate-600 rounded-lg shadow-sm placeholder-gray-400 bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                placeholder="Enter your username"
              />
            </div>

            <!-- Password field -->
            <div>
              <label for="password" class="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  required
                  :disabled="isLoading"
                  class="block w-full px-3 py-2 pr-10 border border-slate-600 rounded-lg shadow-sm placeholder-gray-400 bg-slate-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  :disabled="isLoading"
                  class="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-300 disabled:opacity-50"
                >
                  <svg
                    v-if="showPassword"
                    class="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                    ></path>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Remember me -->
            <div class="flex items-center">
              <input
                id="remember"
                v-model="form.rememberMe"
                type="checkbox"
                :disabled="isLoading"
                class="h-4 w-4 text-blue-600 bg-slate-700 border-slate-600 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50"
              />
              <label for="remember" class="ml-2 block text-sm text-gray-300"> Remember me </label>
            </div>

            <!-- Submit button -->
            <button
              type="submit"
              :disabled="isLoading || !form.username || !form.password"
              class="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <svg
                v-if="isLoading"
                class="w-4 h-4 mr-2 animate-spin"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ isLoading ? 'Signing in...' : 'Sign In' }}
            </button>

            <!-- Register link -->
            <div class="mt-6 text-center border-t border-slate-700 pt-4"></div>
            <!-- Forgot password -->
            <div class="text-center">
              <a
                href="/forgot-password"
                class="text-sm text-blue-400 hover:text-blue-300 transition-colors duration-200"
              >
                Forgot your password?
              </a>
            </div>
          </form>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useAuth } from '../stores/auth';

// Emits
const emit = defineEmits<{
  close: [];
  loginSuccess: [];
}>();

// Auth store
const { login, isLoading, clearError } = useAuth();

// Form state
const form = reactive({
  username: '',
  password: '',
  rememberMe: false,
});

// UI state
const showPassword = ref(false);
const error = ref<string | null>(null);

// Handle form submission
const handleSubmit = async () => {
  try {
    error.value = null;
    clearError();

    // Determine if input is username or username
    const credentials = form.username.includes('@')
      ? { username: form.username, password: form.password }
      : { username: form.username, password: form.password };

    await login(credentials);

    // Success - emit event to close modal
    emit('loginSuccess');
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Login failed. Please try again.';
  }
};
</script>
