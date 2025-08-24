<template>
  <div
    class="relative w-full h-96 lg:h-[600px] lg:w-[900px] overflow-hidden rounded-lg shadow-xl group cursor-pointer"
  >
    <!-- Image -->
    <img
      src="https://scontent.fmnl4-4.fna.fbcdn.net/v/t39.30808-6/485803947_666289042577146_3168052988094871276_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=BI2KeMa8wZwQ7kNvwE3Z_gS&_nc_oc=Adn_ln2cwN1bq8ydOYt84gVvYM5U7bMPyHKnuCiJW_UZYlvVhbc0bTFOfNFnKGsZj9D-G7qJ6UNcKBAyp7VDL-em&_nc_zt=23&_nc_ht=scontent.fmnl4-4.fna&_nc_gid=lLpUNNgCca17mX3k2gaeaw&oh=00_AfVadFWxJyDvYLx_IZ47l2zQWw2guZUOqLS4YZYVCG6Z5w&oe=68AF3FEC"
      alt="Once Human"
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
        <h1 class="text-3xl font-bold mb-3 text-shadow">Once Human</h1>
        <p class="text-sm leading-relaxed text-gray-200 line-clamp-4">
          Once Human is a multiplayer open-world survival game set in a strange, post-apocalyptic
          future. Unite with friends to fight monstrous enemies, uncover secret plots, compete for
          resources, and build your own territory. In this world, you will battle the twisted
          creatures born of alien contamination, unravel the mystery of the collapse of human
          civilization, and craft your destiny.
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
