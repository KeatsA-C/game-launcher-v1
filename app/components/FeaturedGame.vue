<template>
  <div
    class="relative w-full h-96 lg:h-[600px] lg:w-[900px] overflow-hidden rounded-lg shadow-xl group cursor-pointer"
  >
    <!-- Image -->
    <img
      src="http://localhost:3000/games/Featured/Cover.png"
      alt="Game Name"
      class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />

    <!-- Overlay with gradient -->
    <div
      class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300"
    ></div>

    <!-- Text Content -->
    <div
      class="absolute inset-0 flex flex-col justify-end p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
    >
      <div class="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
        <h1 class="text-3xl font-bold mb-3 text-shadow">PluginEnvironment</h1>
        <p class="text-sm leading-relaxed text-gray-200 line-clamp-4">
          PluginEnvironment is an open-world exploration and survival simulation with a strong
          educational focus on engineering, architecture, and electrical systems, offering a rich
          and immersive learning experience.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.text-shadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
