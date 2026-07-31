<template>
  <article
    class="flex flex-col sm:flex-row gap-6 rounded-lg border border-gray-700 bg-gray-900/90 p-5 transition-shadow duration-[230ms] hover:shadow-lg"
  >
    <!-- Book cover placeholder -->
    <div
      class="shrink-0 mx-auto sm:mx-0 w-32 h-48 sm:w-36 sm:h-52 rounded-md shadow-md flex items-center justify-center text-center p-3"
      :class="coverClass"
      aria-hidden="true"
    >
      <span class="font-heading text-sm font-bold leading-tight">
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
    ? "bg-torch-900/40 text-torch-300 border border-torch-700"
    : "bg-forest-900/40 text-forest-300 border border-forest-700",
);

const coverClass = computed(() => {
  const topic = props.book.topic;
  if (topic === "Borrowing") return "bg-cobalt-900/60 text-cobalt-100 border border-cobalt-700";
  if (topic === "Money Management") return "bg-sun-900/60 text-sun-100 border border-sun-700";
  if (topic === "Inflation") return "bg-iris-900/60 text-iris-100 border border-iris-700";
  return "bg-gray-800 text-gray-100 border border-gray-700";
});

const topicColorClass = computed(() => {
  const topic = props.book.topic;
  if (topic === "Borrowing") return "bg-cobalt-500";
  if (topic === "Money Management") return "bg-sun-500";
  if (topic === "Inflation") return "bg-iris-500";
  return "bg-gray-500";
});
</script>
