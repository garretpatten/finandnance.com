<template>
  <div class="max-w-4xl mx-auto">
    <h1 tabindex="-1" class="sr-only outline-none">Books</h1>

    <section aria-labelledby="store-heading" class="soft-enter">
      <div class="text-center mb-10">
        <h2
          id="store-heading"
          class="text-3xl md:text-4xl font-bold text-gray-100 mb-3"
        >
          The Fin and Nance Shop
        </h2>
        <p class="font-sans text-lg text-gray-300 max-w-2xl mx-auto">
          Wholesome chapter books that turn everyday money moments into
          story-driven adventures.
        </p>
      </div>

      <div class="space-y-10">
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
      "Fin needs money fast so he turns to his sister for help. What seems like an easy loan to repay quickly spirals out of control. Nance wants to keep helping, but she's running out of patience--and savings!  Readers will discover why saving money matters, why borrowing isn't free, and how loans and interest work.",
    topic: "Borrowing",
    buyLink: "https://www.amazon.com/gp/product/0960000755?ref_=dbs_m_mng_rwt_calw_tpbk_1&storeType=ebooks",
  },
  {
    title: "No Money Monday",
    status: "available",
    cover: "/assets/images/no-money-monday-cover.jpg",
    description:
      "Fin is running out of time! He needs to buy muffin ingredients for his school bake sale. But there's a big problem: it's No Money Monday, and no one can use money. With his sister Nance by his side, they set off on a wild bartering adventure to get the muffin ingredients before it's too late. Readers will discover why money exists, why bartering is challenging, and interesting types of money.",
    topic: "Money Management",
    buyLink: "https://www.amazon.com/gp/product/0960000763?ref_=dbs_m_mng_rwt_calw_tpbk_0&storeType=ebooks",
  },
  {
    title: "The Inflation Book",
    status: "in-production",
    description:
      "Fin and Nance watch chaos ensue as ticket prices sky rocket at their school fair. Supplies are running out, lines are getting long, and tensions are rising. Join Fin and Nance as they save the fair and solve the mystery of the sky high prices.",
    topic: "Inflation",
  },
]);
</script>
