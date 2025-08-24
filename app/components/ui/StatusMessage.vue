<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 transform -translate-y-2"
    enter-to-class="opacity-100 transform translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 transform translate-y-0"
    leave-to-class="opacity-0 transform -translate-y-2"
  >
    <div v-if="show" :class="containerClasses">
      <div class="flex items-center">
        <!-- Icon -->
        <div class="flex-shrink-0">
          <!-- Success Icon -->
          <svg
            v-if="type === 'success'"
            class="h-5 w-5 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>

          <!-- Error Icon -->
          <svg
            v-else-if="type === 'error'"
            class="h-5 w-5 text-red-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L3.316 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>

          <!-- Warning Icon -->
          <svg
            v-else-if="type === 'warning'"
            class="h-5 w-5 text-yellow-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>

          <!-- Info Icon (default) -->
          <svg
            v-else
            class="h-5 w-5 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <!-- Content -->
        <div class="ml-3 flex-1">
          <h3 v-if="title" :class="titleClasses">{{ title }}</h3>
          <p :class="messageClasses">{{ message }}</p>
        </div>

        <!-- Dismiss button -->
        <div v-if="dismissible" class="ml-4 flex-shrink-0">
          <button
            @click="handleDismiss"
            class="text-gray-400 hover:text-gray-300 transition-colors duration-200"
          >
            <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';

interface Props {
  type?: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  dismissible?: boolean;
  autoDismiss?: boolean;
  autoDismissDelay?: number;
  show?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'info',
  dismissible: true,
  autoDismiss: false,
  autoDismissDelay: 5000,
  show: true,
});

const emit = defineEmits<{
  dismiss: [];
}>();

const containerClasses = computed(() => {
  const baseClasses = 'p-4 rounded-lg border mb-6';

  const typeClasses = {
    success: 'bg-green-900/50 border-green-700',
    error: 'bg-red-900/50 border-red-700',
    warning: 'bg-yellow-900/50 border-yellow-700',
    info: 'bg-blue-900/50 border-blue-700',
  };

  return [baseClasses, typeClasses[props.type]].join(' ');
});

const titleClasses = computed(() => {
  const typeClasses = {
    success: 'text-green-200',
    error: 'text-red-200',
    warning: 'text-yellow-200',
    info: 'text-blue-200',
  };

  return ['text-sm font-medium', typeClasses[props.type]].join(' ');
});

const messageClasses = computed(() => {
  const baseClasses = 'text-sm';
  const marginClasses = props.title ? 'mt-1' : '';

  const typeClasses = {
    success: 'text-green-300',
    error: 'text-red-300',
    warning: 'text-yellow-300',
    info: 'text-blue-300',
  };

  return [baseClasses, marginClasses, typeClasses[props.type]].join(' ');
});

const handleDismiss = () => {
  emit('dismiss');
};

// Auto-dismiss functionality
onMounted(() => {
  if (props.autoDismiss && props.autoDismissDelay > 0) {
    setTimeout(() => {
      handleDismiss();
    }, props.autoDismissDelay);
  }
});
</script>
