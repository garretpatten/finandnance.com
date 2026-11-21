import { defineStore } from "pinia";
import { ref } from "vue";

/**
 * Shared mobile-menu state. Header owns the dialog, while App.vue reads
 * isOpen to mark the rest of the page (header bar, main, footer, skip
 * link) inert while the dialog is open.
 */
export const useMenuStore = defineStore("menu", () => {
  const isOpen = ref(false);

  const open = () => {
    isOpen.value = true;
  };

  const close = () => {
    isOpen.value = false;
  };

  const toggle = () => {
    isOpen.value = !isOpen.value;
  };

  return {
    isOpen,
    open,
    close,
    toggle,
  };
});
