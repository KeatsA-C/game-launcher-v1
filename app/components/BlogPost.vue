<template>
  <article
    class="group bg-slate-900 rounded-xl shadow-lg hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden border border-slate-700 hover:border-slate-600 max-w-md"
  >
    <!-- Image Container with Landscape 16:9 Ratio -->
    <div class="relative aspect-video overflow-hidden">
      <div class="slider w-full h-full">
        <div class="swiper-container w-full h-full">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img
                src="https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80"
                alt="AI Development neural networks"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
            <div class="swiper-slide">
              <img
                src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80"
                alt="Machine learning algorithms visualization"
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
        8 min read
      </div>
    </div>

    <!-- Content Container -->
    <div class="p-6 space-y-4">
      <!-- Category Badge -->
      <div class="flex items-center gap-2 mb-3">
        <span
          class="bg-blue-500/20 text-blue-300 text-xs font-semibold px-3 py-1 rounded-full border border-blue-500/30"
        >
          AI Development
        </span>
        <time class="text-slate-400 text-sm" datetime="2024-08-21"> Aug 21, 2024 </time>
      </div>

      <!-- Title with proper hierarchy -->
      <h2
        class="text-xl font-bold text-slate-100 leading-tight group-hover:text-blue-400 transition-colors duration-200 line-clamp-2"
      >
        Advanced Neural Network Architectures: From Transformers to Diffusion Models
      </h2>

      <!-- Content with improved readability -->
      <p class="text-slate-300 leading-relaxed line-clamp-3 text-sm">
        Explore cutting-edge neural network architectures that are revolutionizing AI development.
        Learn about transformer models, diffusion processes, and emerging techniques for building
        more efficient and powerful AI systems in production environments.
      </p>

      <!-- Author and CTA section -->
      <div class="flex items-center justify-between pt-4 border-t border-slate-700">
        <div class="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format&q=80"
            alt="Author avatar"
            class="w-8 h-8 rounded-full object-cover ring-2 ring-slate-600"
            loading="lazy"
          />
          <div class="text-sm">
            <p class="font-medium text-slate-200">Dr. Sarah Chen</p>
            <p class="text-slate-400 text-xs">AI Research Engineer</p>
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
  name: 'AIBlogPostCard',
  props: {
    title: {
      type: String,
      default: 'Advanced Neural Network Architectures: From Transformers to Diffusion Models',
    },
    excerpt: {
      type: String,
      default:
        'Explore cutting-edge neural network architectures that are revolutionizing AI development. Learn about transformer models, diffusion processes, and emerging techniques for building more efficient and powerful AI systems in production environments.',
    },
    category: {
      type: String,
      default: 'AI Development',
    },
    publishDate: {
      type: String,
      default: '2024-08-21',
    },
    readTime: {
      type: String,
      default: '8 min read',
    },
    author: {
      type: Object,
      default: () => ({
        name: 'Dr. Sarah Chen',
        title: 'AI Research Engineer',
        avatar:
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format&q=80',
      }),
    },
    images: {
      type: Array,
      default: () => [
        'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80',
        'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80',
      ],
    },
  },
  setup() {
    let swiper = null;

    onMounted(() => {
      // Initialize Swiper
      swiper = new Swiper('.swiper-container', {
        modules: [Navigation, Pagination],
        loop: true,
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
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

    return {};
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
