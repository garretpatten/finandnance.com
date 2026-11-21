<template>
  <article
    class="flex flex-col rounded-xl border border-gray-700 bg-gray-900/90 p-6 transition-shadow duration-[230ms] hover:shadow-xl md:max-w-2xl md:mx-auto"
  >
    <!-- Book cover -->
    <div class="flex justify-center py-8 mb-2">
      <img
        v-if="book.cover"
        :src="book.cover"
        :alt="`${book.title} cover`"
        width="576"
        height="890"
        loading="lazy"
        decoding="async"
        class="w-60 sm:w-72 h-auto rounded-lg shadow-xl"
      />
      <div
        v-else
        class="w-60 h-80 sm:w-72 sm:h-96 rounded-lg shadow-xl overflow-hidden"
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
      <div class="mb-2">
        <h3 class="font-heading text-2xl font-bold text-gray-100 mb-2">
          {{ book.title }}
        </h3>
      </div>

      <p class="font-sans text-gray-100 leading-snug mb-4 flex-1 whitespace-pre-wrap">
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
            :viewBox="amazonIcon.viewBox"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path :d="amazonIcon.iconPath" />
          </svg>
          Buy on Amazon
        </a>
        <span
          v-else-if="book.status === 'in-production'"
          class="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-700 text-gray-400 font-medium"
        >
          Coming Soon!
        </span>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue';
import { amazonIcon } from '../data/socials';

const props = defineProps({
  book: {
    type: Object,
    required: true,
  },
});

const coverClass = computed(() => {
  const topic = props.book.topic;
  if (topic === 'Borrowing')
    return 'bg-terracotta-900/60 text-terracotta-100 border border-terracotta-700';
  if (topic === 'Money Management')
    return 'bg-butter-900/60 text-butter-100 border border-butter-700';
  if (topic === 'Inflation') return 'bg-aqua-900/60 text-aqua-100 border border-aqua-700';
  return 'bg-gray-800 text-gray-100 border border-gray-700';
});
</script>
