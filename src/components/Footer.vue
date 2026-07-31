<template>
  <footer class="border-t border-gray-700 mt-16 pt-8 pb-8">
    <p class="text-sm text-gray-200 text-center">
      &copy; {{ year }} Maureen Patten. All rights reserved.
    </p>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear();
</script>
