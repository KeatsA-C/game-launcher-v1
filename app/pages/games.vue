<!-- games.vue - Updated with seeded games -->
<template>
  <Transition
    appear
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 translate-y-8"
    enter-to-class="opacity-100 translate-y-0"
  >
    <div class="min-h-screen bg-slate-950 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <!-- Featured Game Section -->
        <section class="mb-16">
          <div class="mb-6">
            <h2 class="text-2xl font-semibold text-slate-200 mb-2">Featured Game</h2>
            <p class="text-slate-400">Discover our top pick this week</p>
          </div>
          <div class="flex justify-center">
            <FeaturedGame />
          </div>
        </section>

        <!-- Games Grid Section -->
        <section class="mb-12">
          <div class="mb-8">
            <div class="flex items-center justify-between">
              <h2 class="text-2xl font-semibold text-slate-200">All Games</h2>
              <div class="flex items-center space-x-4">
                <!-- Run Launcher Button -->
                <ActionButton
                  v-if="games.length > 0 && authStore.isAuthenticated"
                  @click="runLauncher"
                  :disabled="launcher.isLoading || !authStore.isAuthenticated"
                  :loading="launcher.isLoading"
                  variant="primary"
                  class="hidden sm:inline-flex"
                >
                  <LauncherIcon />
                  {{ launcher.isLoading ? 'Launching...' : 'Run Launcher' }}
                </ActionButton>

                <!-- Refresh Button -->
                <ActionButton
                  @click="loadGames"
                  :disabled="isLoading"
                  :loading="isLoading"
                  variant="secondary"
                >
                  {{ isLoading ? 'Loading...' : 'Refresh' }}
                </ActionButton>
              </div>
            </div>
          </div>

          <!-- Status Messages -->
          <StatusMessage
            v-if="launcher.error"
            type="error"
            :message="launcher.error"
            @dismiss="launcher.error = null"
          />

          <StatusMessage
            v-if="launcher.success"
            type="success"
            message="The launcher application should open shortly."
            auto-dismiss
          />

          <StatusMessage
            v-if="gameRunner.error"
            type="error"
            :message="gameRunner.error"
            @dismiss="gameRunner.error = null"
          />

          <StatusMessage
            v-if="gameRunner.success"
            type="success"
            :message="gameRunner.successMessage"
            auto-dismiss
          />

          <!-- Content States -->
          <LoadingState v-if="isLoading && games.length === 0" message="Loading games..." />

          <!-- Games Grid -->
          <div
            v-else
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
          >
            <GameCard
              v-if="authStore.isAuthenticated"
              v-for="game in games"
              :key="game.id"
              :game-name="game.name"
              :game-details="game.description"
              :game-image="game.coverImage"
              :preview-image="game.previewImage"
              :disabled="gameRunner.isLoading"
              @play="handlePlay"
            />
          </div>
        </section>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useAuth } from '../stores/auth';
import { useNotifications } from '../composables/useNotifications';

import ActionButton from '~/components/ui/ActionButton.vue';
import StatusMessage from '~/components/ui/StatusMessage.vue';

import LauncherIcon from '~/components/ui/icons/LauncherIcon.vue';
import LoadingState from '~/components/ui/LoadingState.vue';

// Stores and composables
const authStore = useAuth();
// Component state
const games = ref([]);
const isLoading = ref(false);
const error = ref(null);

// Launcher state management
const launcher = reactive({
  isLoading: false,
  error: null,
  success: false,
});

// Game runner state management
const gameRunner = reactive({
  isLoading: false,
  error: null,
  success: false,
  successMessage: 'Game Running...',
});

// Seeded games data with real images
const seedGames = [
  {
    id: 1,
    name: 'The Witcher 3',
    description: 'An epic open-world fantasy RPG with rich storytelling and immersive gameplay.',
    coverImage: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1wyy.png',
    previewImage: 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc0obn.jpg',
  },
  {
    id: 2,
    name: 'Grand Theft Auto V',
    description: 'An action-adventure game set in the sprawling city of Los Santos.',
    coverImage: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1tmu.png',
    previewImage: 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc0fha.jpg',
  },
  {
    id: 3,
    name: 'Cyberpunk 2077',
    description: 'A futuristic open-world RPG set in the dystopian Night City.',
    coverImage: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbd.png',
    previewImage: 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc13n8.jpg',
  },
  {
    id: 4,
    name: 'Red Dead Redemption 2',
    description: 'A Western-themed action-adventure game with stunning visuals and deep narrative.',
    coverImage: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1q1f.png',
    previewImage: 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc0m3e.jpg',
  },
  {
    id: 5,
    name: 'Assassins Creed Valhalla',
    description: 'Embark on a Viking saga and forge your path through medieval England.',
    coverImage: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co2a54.png',
    previewImage: 'https://images.igdb.com/igdb/image/upload/t_screenshot_big/sc0wj1.jpg',
  },
];

// Game loading - Updated to use seeded data
const loadGames = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    // Simulate API loading delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Use seeded games instead of API call
    games.value = seedGames;
  } catch (err) {
    console.error('Failed to load games:', err);
    error.value = err.message || 'Failed to load games';
  } finally {
    isLoading.value = false;
  }
};

// Launcher management
const runLauncher = async () => {
  launcher.isLoading = true;
  launcher.error = null;
  launcher.success = false;

  setTimeout(() => {
    launcher.success = true;
  }, 500);

  // Auto-hide success message
  setTimeout(() => {
    launcher.success = false;
  }, 5000);

  setTimeout(() => {
    launcher.isLoading = false;
  }, 500);
};

// Game play handler - Updated to use runGame API
const handlePlay = async function (gameName) {
  gameRunner.success = true;
};

// Auto-refresh handlers
const handleVisibilityChange = () => {
  if (!document.hidden && authStore.isAuthenticated) {
    loadGames();
  }
};

const handleWindowFocus = () => {
  if (authStore.isAuthenticated) {
    loadGames();
  }
};

// Lifecycle
onMounted(() => {
  loadGames();

  // Setup auto-refresh listeners
  document.addEventListener('visibilitychange', handleVisibilityChange);
  window.addEventListener('focus', handleWindowFocus);
});

onUnmounted(() => {
  // Cleanup listeners
  document.removeEventListener('visibilitychange', handleVisibilityChange);
  window.removeEventListener('focus', handleWindowFocus);
});
</script>
