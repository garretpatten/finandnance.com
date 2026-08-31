<template>
  <div class="max-w-4xl mx-auto">
    <!-- Hero Section -->
    <section class="text-center mb-10 soft-enter">
      <h1 tabindex="-1" class="text-5xl md:text-6xl font-bold text-gray-100 mb-4 outline-none">
        Fin & Nance
      </h1>
      <p class="font-sans text-xl md:text-2xl text-gray-300 mb-6">
        A wholesome chapter book series that turns financial literacy into a
        story-driven adventure for children aged 6–10.
      </p>
      <img
        src="/assets/images/fin-and-nance.png"
        alt="Fin and Nance characters"
        class="mx-auto w-full max-w-[480px]"
      />
    </section>

    <!-- Calls to Action -->
    <section class="text-center mb-16 soft-enter soft-enter-delay-2">
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <router-link
          to="/books"
          class="interactive-focus px-6 py-3 bg-terracotta text-gray-950 hover:bg-terracotta-300 rounded-lg font-medium transition-colors duration-[230ms]"
        >
          Explore the Books
        </router-link>
        <router-link
          to="/about"
          class="interactive-focus px-6 py-3 bg-butter text-gray-950 rounded-lg font-medium hover:bg-butter-300 transition-colors duration-[230ms]"
        >
          About the Author
        </router-link>
      </div>
    </section>

  </div>
</template>
