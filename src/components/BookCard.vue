<template>
  <article
    class="flex flex-col rounded-xl border border-gray-700 bg-gray-900/90 p-6 transition-shadow duration-[230ms] hover:shadow-xl"
  >
    <!-- Book cover -->
    <div class="flex justify-center py-6 mb-4">
      <img
        v-if="book.cover"
        :src="book.cover"
        :alt="`${book.title} cover`"
        class="w-44 sm:w-52 h-auto rounded-lg shadow-xl"
      />
      <div
        v-else
        class="w-44 h-64 sm:w-52 sm:h-72 rounded-lg shadow-xl overflow-hidden"
        :class="coverClass"
      >
        <span
          class="font-heading text-base font-bold leading-tight flex items-center justify-center text-center p-4 w-full h-full"
        >
          {{ book.title }}
        </span>
      </div>
    </div>

    <!-- Book details -->
    <div class="flex flex-col text-center flex-1">
      <div class="mb-4">
        <h3 class="font-heading text-2xl font-bold text-gray-100 mb-2">
          {{ book.title }}
        </h3>
        <span
          v-if="book.status === 'in-production'"
          class="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
          :class="statusBadgeClass"
        >
          {{ statusLabel }}
        </span>
      </div>

      <p class="font-sans text-gray-300 leading-relaxed mb-6 flex-1">
        {{ book.description }}
      </p>

      <div class="flex justify-center gap-3 mt-auto">
        <a
          v-if="book.status === 'available' && book.buyLink"
          :href="book.buyLink"
          target="_blank"
          rel="noopener noreferrer"
          class="interactive-focus inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-terracotta text-gray-950 font-medium hover:bg-terracotta-300 transition-colors duration-[230ms]"
          :aria-label="`Buy ${book.title} on Amazon (opens in new tab)`"
        >
          <svg
            aria-hidden="true"
            class="w-4 h-4"
            fill="currentColor"
            viewBox="0 0 448 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32 140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8v40.6zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z"
            />
          </svg>
          Buy on Amazon
        </a>
        <span
          v-else-if="book.status === 'in-production'"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-700 text-gray-400 font-medium"
        >
          Coming soon
        </span>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
});

const statusLabel = computed(() =>
  props.book.status === "in-production" ? "In Production" : "Available",
);

const statusBadgeClass = computed(() =>
  props.book.status === "in-production"
    ? "bg-terracotta-900/40 text-terracotta-100 border border-terracotta-700"
    : "bg-sage-900/40 text-sage-100 border border-sage-700",
);

const coverClass = computed(() => {
  const topic = props.book.topic;
  if (topic === "Borrowing") return "bg-terracotta-900/60 text-terracotta-100 border border-terracotta-700";
  if (topic === "Money Management") return "bg-butter-900/60 text-butter-100 border border-butter-700";
  if (topic === "Inflation") return "bg-aqua-900/60 text-aqua-900 border border-aqua-700";
  return "bg-gray-800 text-gray-100 border border-gray-700";
});


</script>
