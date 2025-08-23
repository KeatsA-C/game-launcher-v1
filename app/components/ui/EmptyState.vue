<!-- components/ui/EmptyState.vue -->
<template>
  <div class="text-center py-12">
    <div class="text-slate-400 mb-4">
      <svg class="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    </div>
    <h3 class="text-lg font-medium text-slate-200 mb-2">{{ title }}</h3>
    <p class="text-slate-400">{{ message }}</p>
    <slot name="action" />
  </div>
</template>

<script setup lang="ts">
interface Props {
  title?: string;
  message?: string;
}

withDefaults(defineProps<Props>(), {
  title: 'No items found',
  message: 'There are no items to display at this time',
});
</script>
