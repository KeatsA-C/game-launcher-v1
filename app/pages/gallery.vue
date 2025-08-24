<template>
  <Transition
    appear
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 translate-y-8"
    enter-to-class="opacity-100 translate-y-0"
  >
    <div class="min-h-screen bg-slate-950 text-white">
      <!-- Header -->
      <div class="sticky top-0 z-10 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div class="container mx-auto px-6 py-6">
          <!-- Search and Filter Controls -->
          <div class="flex flex-col md:flex-row gap-4 items-center">
            <div class="relative flex-1 max-w-md">
              <svg
                class="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m21 21-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                ></path>
              </svg>
              <input
                v-model="searchTerm"
                type="text"
                placeholder="Search games..."
                class="w-full pl-10 pr-4 py-3 bg-slate-800/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div class="flex gap-2 flex-wrap">
              <button
                v-for="category in categories"
                :key="category"
                @click="filter = category"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-all duration-300',
                  filter === category
                    ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white shadow-lg'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700',
                ]"
              >
                {{ category }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Gallery Grid -->
      <div class="container mx-auto px-6 py-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <div
            v-for="(game, index) in filteredImages"
            :key="game.id"
            class="group relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 animate-fade-in-up"
            :style="{ animationDelay: `${index * 50}ms` }"
            @mouseenter="hoveredItem = game.id"
            @mouseleave="hoveredItem = null"
          >
            <div class="relative overflow-hidden">
              <img
                :src="game.image"
                :alt="game.title"
                class="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />

              <!-- Overlay -->
              <div
                :class="[
                  'absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent transition-opacity duration-300',
                  hoveredItem === game.id ? 'opacity-90' : 'opacity-60',
                ]"
              />

              <!-- Category Badge -->
              <div class="absolute top-3 right-3">
                <span
                  class="px-2 py-1 text-xs font-semibold bg-cyan-500/20 text-cyan-300 rounded-full backdrop-blur-sm border border-cyan-500/30"
                >
                  {{ game.category }}
                </span>
              </div>

              <!-- Game Info Overlay -->
              <div
                :class="[
                  'absolute bottom-0 left-0 right-0 p-4 transition-transform duration-300',
                  hoveredItem === game.id ? 'transform translate-y-0' : 'transform translate-y-2',
                ]"
              >
                <h3 class="font-bold text-lg mb-2 text-white">{{ game.title }}</h3>

                <div class="flex items-center justify-between text-sm">
                  <div class="flex items-center gap-3">
                    <div class="flex items-center gap-1">
                      <svg class="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 24 24">
                        <path
                          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
                        />
                      </svg>
                      <span class="text-slate-300">{{ game.rating }}</span>
                    </div>

                    <div class="flex items-center gap-1">
                      <svg
                        class="w-4 h-4 text-slate-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
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
                      <span class="text-slate-300">{{ game.views }}</span>
                    </div>
                  </div>

                  <div class="flex items-center gap-1">
                    <svg class="w-4 h-4 text-red-400" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                      />
                    </svg>
                    <span class="text-slate-300">{{ game.likes }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Hover Glow Effect -->
            <div
              :class="[
                'absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none',
                hoveredItem === game.id
                  ? 'opacity-100 shadow-[0_0_30px_rgba(34,211,238,0.3)]'
                  : 'opacity-0',
              ]"
            />
          </div>
        </div>

        <div v-if="filteredImages.length === 0" class="text-center py-16">
          <div class="text-6xl mb-4">🎮</div>
          <h3 class="text-2xl font-bold text-slate-300 mb-2">No games found</h3>
          <p class="text-slate-400">Try adjusting your search or filter criteria</p>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref, computed } from 'vue';

// Reactive data
const filter = ref('All');
const searchTerm = ref('');
const hoveredItem = ref(null);

// Game data
const gameImages = [
  {
    id: 1,
    title: 'Cyber Legends Arena',
    category: 'Competitive',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
    rating: 4.8,
    views: '2.3M',
    likes: 1250,
  },
  {
    id: 2,
    title: 'Eternal Realms Online',
    category: 'MMORPG',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=500&fit=crop',
    rating: 4.9,
    views: '5.1M',
    likes: 3420,
  },
  {
    id: 3,
    title: 'Wasteland Survivor',
    category: 'Survival',
    image: 'https://images.unsplash.com/photo-1580234797602-22c692ac9778?w=600&h=350&fit=crop',
    rating: 4.6,
    views: '1.8M',
    likes: 890,
  },
  {
    id: 4,
    title: 'Neon City Racing',
    category: 'Racing',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop',
    rating: 4.7,
    views: '3.2M',
    likes: 2100,
  },
  {
    id: 5,
    title: "Dragon's Kingdom",
    category: 'OpenWorld',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop',
    rating: 4.9,
    views: '8.5M',
    likes: 5670,
  },
  {
    id: 6,
    title: 'Battle Royale Supreme',
    category: 'Competitive',
    image: 'https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?w=600&h=350&fit=crop',
    rating: 4.5,
    views: '12.3M',
    likes: 8930,
  },
  {
    id: 7,
    title: 'Mystic Forest Adventure',
    category: 'RPG',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=450&fit=crop',
    rating: 4.8,
    views: '2.7M',
    likes: 1560,
  },
  {
    id: 8,
    title: 'Space Colony Builder',
    category: 'Strategy',
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=400&fit=crop',
    rating: 4.6,
    views: '1.9M',
    likes: 1120,
  },
  {
    id: 9,
    title: 'Ocean Depths Explorer',
    category: 'Survival',
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=600&h=500&fit=crop',
    rating: 4.7,
    views: '3.1M',
    likes: 2340,
  },
  {
    id: 10,
    title: 'Crystal Caverns MMO',
    category: 'MMORPG',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=350&fit=crop',
    rating: 4.8,
    views: '6.8M',
    likes: 4520,
  },
  {
    id: 11,
    title: 'Horizon Infinite',
    category: 'OpenWorld',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=450&fit=crop',
    rating: 4.9,
    views: '9.2M',
    likes: 7890,
  },
  {
    id: 12,
    title: 'Tactical Strike Force',
    category: 'Competitive',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop',
    rating: 4.6,
    views: '4.1M',
    likes: 2780,
  },
  {
    id: 13,
    title: 'Viking Saga Chronicles',
    category: 'RPG',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=500&fit=crop',
    rating: 4.8,
    views: '3.6M',
    likes: 2890,
  },
  {
    id: 14,
    title: 'Desert Storm Survival',
    category: 'Survival',
    image: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?w=600&h=350&fit=crop',
    rating: 4.5,
    views: '2.2M',
    likes: 1450,
  },
  {
    id: 15,
    title: 'Galactic Empire Builder',
    category: 'Strategy',
    image: 'https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=600&h=600&fit=crop',
    rating: 4.7,
    views: '2.8M',
    likes: 1890,
  },
  {
    id: 16,
    title: 'Neon Streets Racing',
    category: 'Racing',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=350&fit=crop',
    rating: 4.6,
    views: '3.9M',
    likes: 2560,
  },
  {
    id: 17,
    title: 'Ancient Ruins Explorer',
    category: 'OpenWorld',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop',
    rating: 4.8,
    views: '4.3M',
    likes: 3210,
  },
  {
    id: 18,
    title: 'Elemental Mages Guild',
    category: 'MMORPG',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=450&fit=crop',
    rating: 4.9,
    views: '7.1M',
    likes: 5340,
  },
  {
    id: 19,
    title: 'Underground Racing Circuit',
    category: 'Racing',
    image: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=500&fit=crop',
    rating: 4.7,
    views: '3.4M',
    likes: 2180,
  },
  {
    id: 20,
    title: 'Frozen Wasteland Survival',
    category: 'Survival',
    image: 'https://images.unsplash.com/photo-1580234797602-22c692ac9778?w=600&h=400&fit=crop',
    rating: 4.6,
    views: '2.9M',
    likes: 1670,
  },
];

const categories = [
  'All',
  'Competitive',
  'MMORPG',
  'OpenWorld',
  'Survival',
  'Racing',
  'RPG',
  'Strategy',
];

// Computed properties
const filteredImages = computed(() => {
  return gameImages.filter((game) => {
    const matchesCategory = filter.value === 'All' || game.category === filter.value;
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.value.toLowerCase());
    return matchesCategory && matchesSearch;
  });
});
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  animation: fadeInUp 0.6s ease-out forwards;
  opacity: 0;
}
</style>
