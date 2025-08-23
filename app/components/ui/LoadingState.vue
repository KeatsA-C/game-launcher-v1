<!-- components/ui/LoadingState.vue -->
<template>
  <div class="text-center py-12">
    <div class="animate-spin h-8 w-8 border-b-2 border-blue-500 rounded-full mx-auto mb-4"></div>
    <p class="text-slate-400">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string;
}

withDefaults(defineProps<Props>(), {
  message: 'Loading...',
});
</script>
