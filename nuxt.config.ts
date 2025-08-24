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
  // keep this current in new projects:
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
});
