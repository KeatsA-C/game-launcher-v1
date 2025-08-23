<template>
  <div
    class="relative w-full h-[450px] lg:w-[300px] rounded-lg overflow-visible shadow-xl group cursor-pointer bg-slate-800"
  >
    <!-- Game Image -->
    <img
      :src="gameImage"
      :alt="`${gameName} Cover`"
      class="w-full h-full object-cover rounded-lg"
    />

    <!-- Hover Overlay -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg"
    ></div>

    <!-- Gameplay Preview -->
    <div
      class="absolute top-24 z-20 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-72 transition-all duration-300 ease-out"
    >
      <div
        class="relative bg-slate-900 rounded-lg shadow-2xl border border-slate-700 overflow-hidden"
      >
        <img :src="previewImage" :alt="`${gameName} Preview`" class="w-80 h-45 object-cover" />
        <div class="absolute inset-0 bg-black/20"></div>
        <div
          class="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent"
        >
          <p class="text-white text-sm font-medium">Gameplay Preview</p>
        </div>
      </div>
    </div>

    <!-- Game Info -->
    <div
      class="absolute bottom-0 left-0 right-0 p-4 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out rounded-b-lg"
    >
      <div class="flex items-center justify-between mb-2">
        <h3 class="text-xl font-bold text-shadow truncate flex-1 mr-3">{{ gameName }}</h3>
        <button
          @click="$emit('play', gameName)"
          class="flex-shrink-0 w-12 h-12 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-colors duration-200 shadow-lg hover:shadow-blue-500/25"
        >
          <svg class="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </button>
      </div>
      <p class="text-sm text-gray-300 text-shadow leading-relaxed">{{ gameDetails }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Define props
interface Props {
  gameName: string;
  gameDetails: string;
  gameImage: string;
  previewImage: string;
}

// Define props with defaults
const props = withDefaults(defineProps<Props>(), {
  gameName: 'Unknown Game',
  gameDetails: 'No description available',
  gameImage: 'https://placehold.co/300x450/333/666?text=No+Image',
  previewImage: 'https://placehold.co/320x180/333/666?text=No+Preview',
});

// Define emits
const emit = defineEmits<{
  play: [gameName: string];
}>();
</script>

<style scoped>
.text-shadow {
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.9);
}
</style>
