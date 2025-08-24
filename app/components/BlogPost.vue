<template>
  <article
    class="group bg-slate-900 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden border border-slate-700 hover:border-slate-600 max-w-md"
  >
    <!-- Image Container with Landscape 16:9 Ratio -->
    <div class="relative aspect-video overflow-hidden">
      <div class="slider w-full h-full">
        <div class="swiper-container w-full h-full">
          <div class="swiper-wrapper">
            <div v-for="(image, index) in images" :key="index" class="swiper-slide">
              <img
                :src="image"
                :alt="`${category} image ${index + 1}`"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
          <!-- Navigation buttons -->
          <div
            class="swiper-button-next opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <div
            class="swiper-button-prev opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
          <!-- Pagination -->
          <div
            class="swiper-pagination opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          ></div>
        </div>
      </div>
      <!-- Reading time badge -->
      <div
        class="absolute top-4 right-4 bg-slate-800/80 backdrop-blur-sm text-slate-200 text-sm px-3 py-1 rounded-full border border-slate-600/50"
      >
        {{ readTime }}
      </div>
    </div>

    <!-- Content Container -->
    <div class="p-6 space-y-4">
      <!-- Category Badge -->
      <div class="flex items-center gap-2 mb-3">
        <span
          :class="getCategoryClass(category)"
          class="text-xs font-semibold px-3 py-1 rounded-full border"
        >
          {{ category }}
        </span>
        <time class="text-slate-400 text-sm" :datetime="publishDate">
          {{ formatDate(publishDate) }}
        </time>
      </div>

      <!-- Title with proper hierarchy -->
      <h2
        class="text-xl font-bold text-slate-100 leading-tight group-hover:text-blue-400 transition-colors duration-200 line-clamp-2"
      >
        {{ title }}
      </h2>

      <!-- Content with improved readability -->
      <p class="text-slate-300 leading-relaxed line-clamp-3 text-sm">
        {{ excerpt }}
      </p>

      <!-- Author and CTA section -->
      <div class="flex items-center justify-between pt-4 border-t border-slate-700">
        <div class="flex items-center gap-3">
          <img
            :src="author.avatar"
            :alt="`${author.name} avatar`"
            class="w-8 h-8 rounded-full object-cover ring-2 ring-slate-600"
            loading="lazy"
          />
          <div class="text-sm">
            <p class="font-medium text-slate-200">{{ author.name }}</p>
            <p class="text-slate-400 text-xs">{{ author.title }}</p>
          </div>
        </div>

        <!-- CTA Button -->
        <button
          class="text-blue-400 hover:text-blue-300 font-medium text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded transition-all duration-200"
        >
          Read More →
        </button>
      </div>
    </div>
  </article>
</template>

<script>
import { onMounted, onUnmounted } from 'vue';
import Swiper from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default {
  name: 'BlogPost',
  props: {
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    publishDate: {
      type: String,
      required: true,
    },
    readTime: {
      type: String,
      required: true,
    },
    author: {
      type: Object,
      required: true,
      validator(value) {
        return value && value.name && value.title && value.avatar;
      },
    },
    images: {
      type: Array,
      required: true,
      validator(value) {
        return Array.isArray(value) && value.length > 0;
      },
    },
  },
  setup(props) {
    let swiper = null;

    // Category color mapping
    const getCategoryClass = (category) => {
      const categoryMap = {
        'AI Development': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
        'Machine Learning': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
        'Full Stack Development': 'bg-green-500/20 text-green-300 border-green-500/30',
        'Backend Development': 'bg-orange-500/20 text-orange-300 border-orange-500/30',
        'Database Management': 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
        'DevOps & Containerization': 'bg-red-500/20 text-red-300 border-red-500/30',
        'Linux & System Administration': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
        'Game Development': 'bg-pink-500/20 text-pink-300 border-pink-500/30',
      };

      return categoryMap[category] || 'bg-slate-500/20 text-slate-300 border-slate-500/30';
    };

    // Date formatting
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    };

    onMounted(() => {
      // Initialize Swiper
      swiper = new Swiper('.swiper-container', {
        modules: [Navigation, Pagination],
        loop: props.images.length > 1,
        autoplay:
          props.images.length > 1
            ? {
                delay: 5000,
                disableOnInteraction: false,
              }
            : false,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    });

    onUnmounted(() => {
      if (swiper) {
        swiper.destroy(true, true);
      }
    });

    return {
      getCategoryClass,
      formatDate,
    };
  },
};
</script>

<style scoped>
/* Custom Swiper styling for dark mode */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  @apply text-slate-200 w-8 h-8;
}

:deep(.swiper-button-next):after,
:deep(.swiper-button-prev):after {
  @apply text-sm;
}

:deep(.swiper-pagination-bullet) {
  @apply bg-slate-300 opacity-50;
}

:deep(.swiper-pagination-bullet-active) {
  @apply bg-blue-400 opacity-100;
}

/* Line clamp utilities for text truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Focus states for accessibility in dark mode */
article:focus-within {
  @apply ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-800;
}

/* Smooth animations */
* {
  transition-property: transform, opacity, color, background-color, border-color, box-shadow;
}
</style>
