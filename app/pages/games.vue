<!-- games.vue - Updated handlePlay method -->
<template>
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

        <ErrorState
          v-else-if="error"
          title="Failed to load games"
          :message="error"
          @retry="loadGames"
        />

        <EmptyState
          v-else-if="games.length === 0"
          title="No games found"
          message="Check back later for new games!"
        />

        <!-- Games Grid -->
        <div
          v-else
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12"
        >
          <GameCard
            v-for="game in games"
            :key="game.id"
            :game-name="game.name"
            :game-details="game.description"
            :game-image="`${baseURL}/games/${game.name}/Cover.png`"
            :preview-image="`${baseURL}/games/${game.name}/gameplay/01.png`"
            :disabled="gameRunner.isLoading"
            @play="handlePlay"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue';
import { useAuth } from '../stores/auth';
import { useNotifications } from '../composables/useNotifications';
import apiService from '~/services/api';
import ActionButton from '~/components/ui/ActionButton.vue';
import StatusMessage from '~/components/ui/StatusMessage.vue';
import ErrorState from '~/components/ui/ErrorState.vue';
import EmptyState from '~/components/ui/EmptyState.vue';
import LauncherIcon from '~/components/ui/icons/LauncherIcon.vue';
import LoadingState from '~/components/ui/LoadingState.vue';

// Stores and composables
const authStore = useAuth();
const { showNotification } = useNotifications();

// Component state
const games = ref([]);
const isLoading = ref(false);
const error = ref(null);
const baseURL = ref(import.meta.env.VUE_APP_BASE_URL || 'http://localhost:3000');

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
  successMessage: '',
});

// Game loading
const loadGames = async () => {
  try {
    isLoading.value = true;
    error.value = null;

    const gameList = await apiService.getGameList();
    games.value = gameList;
  } catch (err) {
    console.error('Failed to load games:', err);
    error.value = err.message || 'Failed to load games';
  } finally {
    isLoading.value = false;
  }
};

// Launcher management
const runLauncher = async () => {
  if (!authStore.isAuthenticated) {
    showNotification('Please login first to run the launcher', 'warning');
    return;
  }

  try {
    launcher.isLoading = true;
    launcher.error = null;
    launcher.success = false;

    await apiService.runLauncher();

    launcher.success = true;
    showNotification('Launcher started successfully', 'success');

    // Auto-hide success message
    setTimeout(() => {
      launcher.success = false;
    }, 5000);
  } catch (err) {
    console.error('Failed to run launcher:', err);
    launcher.error = err.message || 'Failed to run launcher';
    showNotification('Failed to run launcher', 'error');
  } finally {
    launcher.isLoading = false;
  }
};

// Game play handler - Updated to use runGame API
const handlePlay = async (gameName) => {
  if (!authStore.isAuthenticated) {
    showNotification('Please login first to run games', 'warning');
    return;
  }

  // Check if launcher code exists
  if (!apiService.getLauncherCode()) {
    showNotification('Please run the launcher first before starting games', 'warning');
    return;
  }

  // Find the game data from the games list
  const game = games.value.find((g) => g.name === gameName);
  if (!game) {
    showNotification('Game not found', 'error');
    return;
  }

  try {
    gameRunner.isLoading = true;
    gameRunner.error = null;
    gameRunner.success = false;

    console.log(`Starting ${gameName}...`);
    await apiService.runGame(game.id, game.name);

    gameRunner.success = true;
    gameRunner.successMessage = `${gameName} is starting...`;
    showNotification(`${gameName} started successfully`, 'success');

    // Auto-hide success message
    setTimeout(() => {
      gameRunner.success = false;
      gameRunner.successMessage = '';
    }, 5000);
  } catch (err) {
    console.error('Failed to run game:', err);
    gameRunner.error = err.message || `Failed to run ${gameName}`;
    showNotification(`Failed to run ${gameName}`, 'error');
  } finally {
    gameRunner.isLoading = false;
  }
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
