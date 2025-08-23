<!-- NotificationToast.vue -->
<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-2 translate-x-2"
    enter-to-class="opacity-100 translate-y-0 translate-x-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0 translate-x-0"
    leave-to-class="opacity-0 translate-y-2 translate-x-2"
  >
    <div
      class="fixed top-4 right-4 z-50 max-w-sm w-full shadow-lg rounded-lg pointer-events-auto overflow-hidden"
      :class="toastClasses"
    >
      <div class="p-4">
        <div class="flex items-start">
          <!-- Icon -->
          <div class="flex-shrink-0">
            <!-- Success Icon -->
            <svg
              v-if="type === 'success'"
              class="h-6 w-6 text-green-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>

            <!-- Error Icon -->
            <svg
              v-else-if="type === 'error'"
              class="h-6 w-6 text-red-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>

            <!-- Warning Icon -->
            <svg
              v-else-if="type === 'warning'"
              class="h-6 w-6 text-yellow-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
              ></path>
            </svg>
          </div>

          <!-- Message -->
          <div class="ml-3 w-0 flex-1 pt-0.5">
            <p class="text-sm font-medium" :class="textClasses">
              {{ message }}
            </p>
          </div>

          <!-- Close button -->
          <div class="ml-4 flex-shrink-0 flex">
            <button
              @click="$emit('close')"
              class="inline-flex text-gray-400 hover:text-gray-300 focus:outline-none focus:text-gray-300 transition-colors duration-200"
            >
              <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="h-1 w-full bg-black/20">
        <div
          class="h-full transition-all duration-75 ease-linear"
          :class="progressClasses"
          :style="{ width: `${progress}%` }"
        ></div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';

// Props
interface Props {
  message: string;
  type?: 'success' | 'error' | 'warning';
  duration?: number;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'success',
  duration: 5000,
});

// Emits
const emit = defineEmits<{
  close: [];
}>();

// Progress state
const progress = ref(100);
let progressInterval: NodeJS.Timeout | null = null;

// Computed classes
const toastClasses = computed(() => {
  const baseClasses = 'border-l-4';

  switch (props.type) {
    case 'success':
      return `${baseClasses} bg-slate-800 border-green-400`;
    case 'error':
      return `${baseClasses} bg-slate-800 border-red-400`;
    case 'warning':
      return `${baseClasses} bg-slate-800 border-yellow-400`;
    default:
      return `${baseClasses} bg-slate-800 border-blue-400`;
  }
});

const textClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-green-300';
    case 'error':
      return 'text-red-300';
    case 'warning':
      return 'text-yellow-300';
    default:
      return 'text-blue-300';
  }
});

const progressClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-400';
    case 'error':
      return 'bg-red-400';
    case 'warning':
      return 'bg-yellow-400';
    default:
      return 'bg-blue-400';
  }
});

// Start progress countdown
const startProgress = () => {
  const interval = 50; // Update every 50ms
  const totalSteps = props.duration / interval;
  const stepSize = 100 / totalSteps;

  progressInterval = setInterval(() => {
    progress.value -= stepSize;

    if (progress.value <= 0) {
      if (progressInterval) {
        clearInterval(progressInterval);
      }
      emit('close');
    }
  }, interval);
};

// Pause progress on hover
const pauseProgress = () => {
  if (progressInterval) {
    clearInterval(progressInterval);
  }
};

// Resume progress when not hovering
const resumeProgress = () => {
  if (progress.value > 0) {
    startProgress();
  }
};

onMounted(() => {
  startProgress();
});

onUnmounted(() => {
  if (progressInterval) {
    clearInterval(progressInterval);
  }
});
</script>
