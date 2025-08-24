<template>
  <main>
    <!-- Notification System -->
    <NotificationToast
      v-if="notification.show"
      :message="notification.message"
      :type="notification.type"
      @close="hideNotification"
    />

    <!-- Login Modal -->
    <LoginModal
      v-if="showLoginModal"
      @close="showLoginModal = false"
      @login-success="handleLoginSuccess"
    />

    <!-- Main Navigation -->
    <nav
      class="relative w-full bg-slate-900 backdrop-blur-sm border-b border-slate-700/50 transition-all duration-500"
    >
      <!-- Loading Overlay -->
      <div
        v-if="isLoading"
        class="absolute inset-0 z-10 bg-slate-900/95 backdrop-blur-sm flex items-center justify-center transition-opacity duration-500"
        :class="{ 'opacity-0 pointer-events-none': !isLoading }"
      >
        <div class="flex flex-col items-center space-y-3 mt-8">
          <div class="w-96 h-1 bg-slate-700 rounded-full overflow-hidden">
            <div
              class="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full animate-loading-line"
            ></div>
          </div>
        </div>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16 lg:h-20">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center">
            <a href="/" class="block">
              <img
                src="/logo.png"
                alt="Company Logo"
                class="h-8 lg:h-10 w-auto transition-transform duration-200 hover:scale-105"
              />
            </a>
          </div>

          <!-- Desktop Navigation Links -->
          <div class="hidden md:block">
            <div class="flex items-center space-x-8">
              <a
                href="/"
                class="text-gray-200 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                :class="{
                  'text-white': currentPage === 'news',
                  'hover:text-white': currentPage !== 'news',
                }"
                @mouseenter="hoveredItem = 'news'"
                @mouseleave="hoveredItem = null"
              >
                News
                <span
                  class="absolute inset-x-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300"
                  :class="
                    currentPage === 'news' || hoveredItem === 'news'
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0'
                  "
                ></span>
              </a>

              <a
                href="/games"
                class="text-gray-200 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                :class="{
                  'text-white': currentPage === 'games',
                  'hover:text-white': currentPage !== 'games',
                }"
                @mouseenter="hoveredItem = 'games'"
                @mouseleave="hoveredItem = null"
              >
                Games
                <span
                  class="absolute inset-x-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300"
                  :class="
                    currentPage === 'games' || hoveredItem === 'games'
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0'
                  "
                ></span>
              </a>

              <a
                href="/gallery"
                class="text-gray-200 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                :class="{
                  'text-white': currentPage === 'gallery',
                  'hover:text-white': currentPage !== 'gallery',
                }"
                @mouseenter="hoveredItem = 'gallery'"
                @mouseleave="hoveredItem = null"
              >
                Gallery
                <span
                  class="absolute inset-x-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300"
                  :class="
                    currentPage === 'gallery' || hoveredItem === 'gallery'
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0'
                  "
                ></span>
              </a>

              <a
                href="/support"
                class="text-gray-200 px-3 py-2 text-sm font-medium transition-colors duration-200 relative group"
                :class="{
                  'text-white': currentPage === 'support',
                  'hover:text-white': currentPage !== 'support',
                }"
                @mouseenter="hoveredItem = 'support'"
                @mouseleave="hoveredItem = null"
              >
                Support
                <span
                  class="absolute inset-x-0 bottom-0 h-0.5 bg-blue-500 transition-all duration-300"
                  :class="
                    currentPage === 'support' || hoveredItem === 'support'
                      ? 'scale-x-100 opacity-100'
                      : 'scale-x-0 opacity-0'
                  "
                ></span>
              </a>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="flex items-center space-x-3">
            <ActionButton
              v-if="authStore.isAuthenticated"
              @click="downloadLauncher"
              :disabled="authStore.isLoading"
              variant="primary"
              class="hidden sm:inline-flex"
            >
              <DownloadIcon />
              Install Launcher
            </ActionButton>

            <!-- Login/Logout Button -->
            <ActionButton
              v-if="!authStore.isAuthenticated"
              @click="handleLogin"
              :disabled="authStore.isLoading || loginInProgress"
              :loading="authStore.isLoading || loginInProgress"
              variant="secondary"
              class="hidden sm:inline-flex"
            >
              Login
            </ActionButton>

            <ActionButton
              v-else
              @click="handleLogout"
              :disabled="authStore.isLoading || logoutInProgress"
              :loading="authStore.isLoading || logoutInProgress"
              variant="danger"
              class="hidden sm:inline-flex"
            >
              <LogoutIcon />
              Logout
            </ActionButton>

            <!-- Contact Button -->
            <ActionButton href="/contact" variant="secondary" class="hidden sm:inline-flex">
              Contact
            </ActionButton>

            <!-- Mobile Menu Button -->
            <button
              @click="toggleMobileMenu"
              class="md:hidden inline-flex items-center justify-center p-2 text-gray-200 hover:text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 rounded-lg transition-colors duration-200"
              :aria-expanded="mobileMenuOpen"
            >
              <MenuIcon :open="mobileMenuOpen" />
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu -->
      <Transition
        enter-active-class="transition-all duration-300 ease-out"
        enter-from-class="opacity-0 -translate-y-2"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition-all duration-200 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-2"
      >
        <div
          v-if="mobileMenuOpen"
          class="md:hidden bg-slate-900/95 backdrop-blur-sm border-t border-slate-700/50"
        >
          <div class="px-4 pt-4 pb-6 space-y-2">
            <!-- Mobile Navigation Links -->
            <a
              href="/"
              class="block px-3 py-3 text-gray-200 hover:text-white hover:bg-slate-800 rounded-lg transition-colors duration-200 text-base font-medium"
              :class="{ 'text-white bg-slate-800': currentPage === 'news' }"
            >
              News
            </a>
            <a
              href="/games"
              class="block px-3 py-3 text-gray-200 hover:text-white hover:bg-slate-800 rounded-lg transition-colors duration-200 text-base font-medium"
              :class="{ 'text-white bg-slate-800': currentPage === 'games' }"
            >
              Games
            </a>
            <a
              href="/gallery"
              class="block px-3 py-3 text-gray-200 hover:text-white hover:bg-slate-800 rounded-lg transition-colors duration-200 text-base font-medium"
              :class="{ 'text-white bg-slate-800': currentPage === 'gallery' }"
            >
              Gallery
            </a>
            <a
              href="/support"
              class="block px-3 py-3 text-gray-200 hover:text-white hover:bg-slate-800 rounded-lg transition-colors duration-200 text-base font-medium"
              :class="{ 'text-white bg-slate-800': currentPage === 'support' }"
            >
              Support
            </a>

            <div class="pt-4 space-y-3 border-t border-slate-700">
              <!-- Install Launcher Button - Mobile (only when authenticated) -->
            </div>
          </div>
        </div>
      </Transition>
    </nav>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue';
import { useAuth } from '../stores/auth';
import { useNotifications } from '../composables/useNotifications';
import NotificationToast from '../components/NotificationToast.vue';
import LoginModal from '../components/LoginModal.vue';
import ActionButton from '~/components/ui/ActionButton.vue';
import DownloadIcon from '~/components/ui/icons/DownloadIcon.vue';
import LogoutIcon from '~/components/ui/icons/LogoutIcon.vue';
import MenuIcon from '~/components/ui/icons/MenuIcon.vue';

// Stores and composables
const authStore = useAuth();
const {
  notification,
  showNotification,
  hideNotification,
  setupGlobalListener,
  cleanupGlobalListener,
} = useNotifications();

// Component state
const isLoading = ref(true);
const loginInProgress = ref(false);
const logoutInProgress = ref(false);
const currentPage = ref<'news' | 'games' | 'gallery' | 'support'>('news');
const hoveredItem = ref<string | null>(null);
const mobileMenuOpen = ref(false);
const showLoginModal = ref(false);

// Utility functions
const detectCurrentPage = (): 'news' | 'games' | 'gallery' | 'support' => {
  if (typeof window === 'undefined') return 'news';

  const path = window.location.pathname;
  if (path === '/' || path === '/news') return 'news';
  if (path.startsWith('/games')) return 'games';
  if (path.startsWith('/gallery')) return 'gallery';
  if (path.startsWith('/support')) return 'support';
  return 'news';
};

const toggleMobileMenu = (): void => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};

const closeMobileMenu = (): void => {
  mobileMenuOpen.value = false;
};

// Auth handlers
const handleLogin = (): void => {
  if (loginInProgress.value || authStore.isLoading) return;
  showLoginModal.value = true;
  closeMobileMenu();
};

const handleLogout = async (): Promise<void> => {
  if (logoutInProgress.value || authStore.isLoading) return;

  logoutInProgress.value = true;
  try {
    await authStore.logout();
    closeMobileMenu();
  } catch (error) {
  } finally {
    logoutInProgress.value = false;
  }
  window.location.reload();
};

const handleLoginSuccess = async (): Promise<void> => {
  showLoginModal.value = false;
  closeMobileMenu();
  loginInProgress.value = false;

  // Refresh data without full page reload

  // Notification will work since page state is preserved
  showNotification('Successfully logged in!', 'success');
};

// Launcher download
// In your layout component, replace the downloadLauncher function with:

const downloadLauncher = async (): Promise<void> => {
  if (!authStore.isAuthenticated) {
    showNotification('Please login first to download the launcher', 'warning');
    return;
  }

  if (authStore.isLoading) {
    showNotification('Please wait...', 'warning');
    return;
  }

  try {
    showNotification('Preparing launcher download...', 'success');

    showNotification('Launcher download started', 'success');
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Download failed';
    showNotification(errorMessage, 'error');
    console.error('Launcher download failed:', error);
  } finally {
    closeMobileMenu();
  }
};
// App initialization
const initializeApp = async (): Promise<void> => {
  try {
    currentPage.value = detectCurrentPage();

    // Minimum loading time for smooth UX
    await new Promise<void>((resolve) => setTimeout(resolve, 100));
  } catch (error) {
    console.error('App initialization failed:', error);
    showNotification('Failed to initialize app', 'error');
  } finally {
    isLoading.value = false;
  }
};

// Event handlers
const handleKeydown = (e: KeyboardEvent): void => {
  if (e.key === 'Escape') {
    closeMobileMenu();
    if (showLoginModal.value) {
      showLoginModal.value = false;
      loginInProgress.value = false;
    }
  }
};

const handleClickOutside = (e: Event): void => {
  const target = e.target as Element;
  if (mobileMenuOpen.value && !target?.closest('nav')) {
    closeMobileMenu();
  }
};

// Lifecycle
onMounted(() => {
  initializeApp();
  setupGlobalListener();

  if (typeof window !== 'undefined') {
    document.addEventListener('keydown', handleKeydown);
    document.addEventListener('click', handleClickOutside);
  }
});

onUnmounted(() => {
  cleanupGlobalListener();

  if (typeof window !== 'undefined') {
    document.removeEventListener('keydown', handleKeydown);
    document.removeEventListener('click', handleClickOutside);
  }
});
</script>

<style scoped>
@keyframes loading-line {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

.animate-loading-line {
  animation: loading-line 250ms ease-in-out infinite;
}
</style>
