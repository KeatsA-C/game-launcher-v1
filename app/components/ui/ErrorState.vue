<!-- components/ui/ErrorState.vue -->
<template>
  <div class="text-center py-12">
    <div class="text-red-400 mb-4">
      <svg class="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.728-.833-2.498 0L3.316 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
    </div>
    <h3 class="text-lg font-medium text-slate-200 mb-2">{{ title }}</h3>
    <p class="text-slate-400 mb-4">{{ message }}</p>
    <button
      v-if="showRetry"
      @click="$emit('retry')"
      class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors duration-200"
    >
      Try Again
    </button>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  message?: string;
  showRetry?: boolean;
}

withDefaults(defineProps<Props>(), {
  title: 'Something went wrong',
  message: 'Please try again later',
  showRetry: true,
});

defineEmits<{
  retry: [];
}>();
</script>
