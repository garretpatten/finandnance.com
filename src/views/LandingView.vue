<template>
  <div class="max-w-4xl mx-auto">
    <!-- Hero Section -->
    <section class="text-center mb-16 soft-enter">
      <h1 tabindex="-1" class="text-5xl md:text-6xl font-bold text-gray-100 mb-4 outline-none">
        Fin and Nance
      </h1>
      <p class="font-sans text-xl md:text-2xl text-gray-300 mb-8">
        A children's book series on financial literacy
      </p>
      <img
        src="/assets/images/fin-and-nance.png"
        alt="Fin and Nance characters"
        class="mx-auto w-full max-w-md"
      />
    </section>

    <!-- Value Proposition -->
    <section class="mb-16 soft-enter soft-enter-delay-1">
      <p
        class="font-sans text-lg md:text-xl text-gray-200 leading-relaxed text-center max-w-2xl mx-auto"
      >
        This wholesome chapter book series transforms financial literacy into a
        lively, story-driven adventure for children aged 6–10.
      </p>
    </section>

    <!-- Key Highlights -->
    <section
      class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16 soft-enter soft-enter-delay-2"
    >
      <div class="text-center">
        <div class="font-heading text-2xl font-bold text-terracotta mb-2">Adventure-Based Learning</div>
        <div class="font-mono text-sm text-gray-100">
          Join siblings Fin and Nance as they naturally discover saving, borrowing, bartering, and more.
        </div>
      </div>
      <div class="text-center">
        <div class="font-heading text-2xl font-bold text-butter mb-2">Ideal Reading Format</div>
        <div class="font-mono text-sm text-gray-100">
          Perfect for independent reading or cherished family read-aloud time.
        </div>
      </div>
      <div class="text-center">
        <div class="font-heading text-2xl font-bold text-aqua mb-2">Bonus Learning Section</div>
        <div class="font-mono text-sm text-gray-100">
          Each book includes questions and lessons to spark meaningful conversations.
        </div>
      </div>
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
          class="interactive-focus px-6 py-3 bg-sage border-2 border-butter text-gray-950 rounded-lg font-medium hover:border-aqua hover:bg-sage-300 transition-colors duration-[230ms]"
        >
          About the Author
        </router-link>
      </div>
    </section>

  </div>
</template>
