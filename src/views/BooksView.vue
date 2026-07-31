<template>
  <div class="max-w-4xl mx-auto">
    <h1 tabindex="-1" class="sr-only outline-none">Books</h1>

    <section aria-labelledby="books-heading" class="soft-enter">
      <h2
        id="books-heading"
        class="mb-8 text-lg font-semibold uppercase tracking-wider text-butter"
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
    cover: "/assets/images/little-borrowing-brother-cover.jpg",
    description:
      "This wholesome chapter book—now in its revised second edition—transforms financial literacy into a lively, story-driven adventure for children aged 6–10. Young readers join siblings Fin and Nance as they discover why saving money matters, why borrowing isn't free, how loans and interest work, and how responsible choices strengthen character. Perfect for independent reading or family read-aloud time, the story masterfully blends humor, sibling teamwork, and real-world problem-solving. The fun continues with a bonus section that includes questions and lessons to deepen understanding and spark meaningful conversations. This book is part of the Fin and Nance series, where everyday adventures help children grow smart with money and strong in character.",
    topic: "Borrowing",
  },
  {
    title: "No Money Monday",
    status: "available",
    cover: "/assets/images/no-money-monday-cover.jpg",
    description:
      "This wholesome chapter book—now in its revised second edition—transforms financial literacy into a lively, story-driven adventure for children aged 6–10. Young readers join siblings Fin and Nance as they discover why money exists, why bartering is challenging, and how responsible choices strengthen character. Perfect for independent reading or family read-aloud time, the story masterfully blends humor, sibling teamwork, and real-world problem-solving. The fun continues with a bonus section that includes questions and lessons to deepen understanding and spark meaningful conversations. This book is part of the Fin and Nance series, where everyday adventures help children grow smart with money and strong in character.",
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
