<template>
  <article
    class="flex flex-col sm:flex-row gap-6 rounded-lg border border-gray-700 bg-gray-900/90 p-5 transition-shadow duration-[230ms] hover:shadow-lg"
  >
    <!-- Book cover -->
    <div
      class="shrink-0 mx-auto sm:mx-0 w-32 h-48 sm:w-36 sm:h-52 rounded-md shadow-md overflow-hidden"
      :class="{ [coverClass]: !book.cover }"
      aria-hidden="true"
    >
      <img
        v-if="book.cover"
        :src="book.cover"
        :alt="`${book.title} cover`"
        class="w-full h-full object-cover"
      />
      <span
        v-else
        class="font-heading text-sm font-bold leading-tight flex items-center justify-center text-center p-3 w-full h-full"
      >
        {{ book.title }}
      </span>
    </div>

    <!-- Book details -->
    <div class="flex flex-col justify-center flex-1 text-center sm:text-left">
      <div class="mb-3 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 justify-center sm:justify-start">
        <h3 class="font-heading text-xl font-bold text-gray-100">
          {{ book.title }}
        </h3>
        <span
          class="self-center sm:self-auto inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium"
          :class="statusBadgeClass"
        >
          {{ statusLabel }}
        </span>
      </div>

      <p class="font-sans text-gray-300 leading-relaxed mb-4">
        {{ book.description }}
      </p>

      <footer class="font-sans text-sm text-gray-400">
        <span class="inline-flex items-center gap-1.5">
          <span
            class="h-3 w-3 rounded-full"
            :class="topicColorClass"
            aria-hidden="true"
          />
          {{ book.topic }}
        </span>
      </footer>
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

const topicColorClass = computed(() => {
  const topic = props.book.topic;
  if (topic === "Borrowing") return "bg-terracotta";
  if (topic === "Money Management") return "bg-butter";
  if (topic === "Inflation") return "bg-aqua";
  return "bg-gray-500";
});
</script>
