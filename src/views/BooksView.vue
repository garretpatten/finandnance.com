<template>
  <div class="max-w-4xl mx-auto">
    <h1 tabindex="-1" class="sr-only outline-none">Books</h1>

    <section aria-labelledby="books-heading" class="soft-enter">
      <h2
        id="books-heading"
        class="mb-8 text-lg font-semibold uppercase tracking-wider text-forest-600"
      >
        The Books
      </h2>

      <div class="space-y-8">
        <BookCard v-for="book in books" :key="book.title" :book="book" />
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import BookCard from "../components/BookCard.vue";

const books = ref([
  {
    title: "Little Borrowing Brother",
    status: "available",
    description:
      "A gentle story about borrowing, honesty, and the responsibility that comes with using something that belongs to someone else.",
    topic: "Borrowing",
  },
  {
    title: "No Money Monday",
    status: "available",
    description:
      "When the piggy bank is empty, Fin and Nance get creative. A playful look at needs, wants, and making the most of what you have.",
    topic: "Money Management",
  },
  {
    title: "The Inflation Book",
    status: "in-production",
    description:
      "Fin and Nance notice prices going up at their favorite market. Coming soon: a friendly introduction to what inflation means and how families adapt.",
    topic: "Inflation",
  },
]);
</script>
