export default defineNuxtConfig({
  modules: [
    '@pinia/nuxt',
    // other modules
  ],
  devServer: {
    port: 3002,
  },
  ssr: true,
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ],
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
});
