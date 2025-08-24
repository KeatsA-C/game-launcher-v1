<template>
  <Transition
    appear
    enter-active-class="transition-all duration-500 ease-out"
    enter-from-class="opacity-0 translate-y-8"
    enter-to-class="opacity-100 translate-y-0"
  >
    <div class="min-h-[calc(100vh-5rem)] lg:min-h-[calc(100vh-6rem)] p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        <!-- Game Development & 3D Graphics Posts -->
        <BlogPost
          title="The Rise of Extraction Shooters: Why Tarkov and Hunt Changed Gaming Forever"
          excerpt="Explore how extraction shooters like Escape from Tarkov and Hunt: Showdown revolutionized competitive gaming. Analyze the tension-driven gameplay mechanics that create unforgettable gaming moments and spawned an entire genre."
          category="Games"
          publish-date="2024-08-23"
          read-time="12 min read"
          :author="{
            name: 'Tyler Brooks',
            title: 'Gaming Journalist',
            avatar:
              'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&auto=format&q=80',
          }"
          :images="[
            'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80',
            'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80',
          ]"
        />

        <BlogPost
          title="Survival Horror Renaissance: Why Games Like Phasmophobia Dominate Streaming"
          excerpt="Analyze the resurgence of survival horror games and their perfect synergy with streaming culture. Explore how games like Phasmophobia, Outlast, and Dead by Daylight create shareable moments that define modern gaming entertainment."
          category="Games"
          publish-date="2024-08-10"
          read-time="11 min read"
          :author="{
            name: 'Mark Chen',
            title: 'Horror Game Enthusiast',
            avatar:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format&q=80',
          }"
          :images="[
            'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80',
          ]"
        />

        <BlogPost
          title="The Cozy Gaming Revolution: How Stardew Valley and Animal Crossing Changed Everything"
          excerpt="Explore the rise of cozy gaming and its impact on mental health and gaming culture. Discover how titles like Stardew Valley, Animal Crossing, and Coffee Talk provide therapeutic gameplay experiences in our fast-paced world."
          category="Games"
          publish-date="2024-08-09"
          read-time="10 min read"
          :author="{
            name: 'Sophie Williams',
            title: 'Wellness Gaming Writer',
            avatar:
              'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face&auto=format&q=80',
          }"
          :images="[
            'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80',
          ]"
        />

        <BlogPost
          title="From Indie to AAA: How Hades Redefined the Roguelike Genre"
          excerpt="Discover how Supergiant Games transformed the roguelike formula with Hades. Examine the perfect balance of narrative progression, character development, and addictive gameplay loop that made it a Game of the Year winner."
          category="Games"
          publish-date="2024-08-11"
          read-time="13 min read"
          :author="{
            name: 'Amanda Foster',
            title: 'Indie Game Critic',
            avatar:
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format&q=80',
          }"
          :images="[
            'https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80',
            'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80',
          ]"
        />

        <BlogPost
          title="Unity DOTS: High-Performance Entity Component System for Massive Worlds"
          excerpt="Master Unity's Data-Oriented Technology Stack (DOTS) to create games with thousands of entities. Learn ECS architecture, job system, and burst compiler for maximum performance."
          category="Game Development"
          publish-date="2024-08-19"
          read-time="18 min read"
          :author="{
            name: 'David Kim',
            title: 'Unity Developer',
            avatar:
              'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&auto=format&q=80',
          }"
          :images="[
            'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80',
            'https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80',
          ]"
        />

        <BlogPost
          title="Procedural World Generation: Creating Infinite Landscapes with Perlin Noise"
          excerpt="Learn advanced techniques for procedural world generation in games. Implement Perlin noise, heightmaps, biome systems, and cave generation for creating vast, explorable worlds."
          category="Game Development"
          publish-date="2024-08-18"
          read-time="20 min read"
          :author="{
            name: 'Amanda Foster',
            title: 'Indie Game Critic',
            avatar:
              'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&auto=format&q=80',
          }"
          :images="[
            'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80',
            'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80',
          ]"
        />

        <BlogPost
          title="Real-Time Ray Tracing in Modern Games: Implementation and Optimization"
          excerpt="Deep dive into real-time ray tracing techniques for game development. Learn about hardware acceleration, denoising algorithms, and hybrid rendering pipelines for stunning visual effects."
          category="3D Graphics Programming"
          publish-date="2024-08-17"
          read-time="19 min read"
          :author="{
            name: 'Marcus Johnson',
            title: 'Graphics Programmer',
            avatar:
              'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=40&h=40&fit=crop&crop=face&auto=format&q=80',
          }"
          :images="[
            'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80',
            'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80',
          ]"
        />

        <BlogPost
          title="Mobile Game Optimization: Performance and Battery Life Best Practices"
          excerpt="Essential optimization techniques for mobile game development. Learn about texture compression, LOD systems, efficient shaders, and memory management for iOS and Android platforms."
          category="Mobile Game Development"
          publish-date="2024-08-16"
          read-time="15 min read"
          :author="{
            name: 'Lisa Park',
            title: 'Mobile Game Developer',
            avatar:
              'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=40&h=40&fit=crop&crop=face&auto=format&q=80',
          }"
          :images="[
            'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80',
            'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80',
          ]"
        />

        <BlogPost
          title="Game Physics Engines: Building Realistic Simulations with Bullet Physics"
          excerpt="Implement advanced physics systems in games using Bullet Physics. Cover rigid body dynamics, soft body physics, collision detection, and performance optimization for complex simulations."
          category="Game Development"
          publish-date="2024-08-14"
          read-time="21 min read"
          :author="{
            name: 'Jordan Martinez',
            title: 'Physics Programmer',
            avatar:
              'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face&auto=format&q=80',
          }"
          :images="[
            'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80',
            'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=450&fit=crop&crop=entropy&auto=format&q=80',
          ]"
        />
      </div>
    </div>
  </Transition>
</template>

<script setup>
// Import BlogPost component
// import BlogPost from '@/components/BlogPost.vue'
</script>
