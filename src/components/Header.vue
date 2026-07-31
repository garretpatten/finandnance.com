<template>
  <header class="mb-8 pb-6 relative z-20 px-4 py-3">
    <!-- Mobile Header: Logo and Hamburger -->
    <div class="flex items-center justify-between md:hidden">
      <router-link
        to="/"
        :tabindex="isMenuOpen ? -1 : undefined"
        aria-label="Fin and Nance, home"
        :aria-current="route.path === '/' ? 'page' : undefined"
        class="interactive-focus rounded-md hover:opacity-80 transition-opacity duration-[230ms]"
      >
        <img
          src="/apple-touch-icon.png"
          alt="Fin and Nance"
          class="h-20 w-auto"
        />
      </router-link>

      <button
        ref="menuToggleRef"
        v-show="!isMenuOpen"
        @click="toggleMenu"
        class="p-2 text-gray-100 hover:text-cobalt-400 interactive-focus rounded-md transition-colors duration-[230ms] relative z-50 interactive-lift"
        aria-label="Open menu"
        :aria-expanded="isMenuOpen"
      >
        <svg
          aria-hidden="true"
          class="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- Desktop Header: Logo and Nav -->
    <div class="hidden md:flex md:items-center md:justify-between gap-4">
      <router-link
        to="/"
        aria-label="Fin and Nance, home"
        :aria-current="route.path === '/' ? 'page' : undefined"
        class="interactive-focus rounded-md hover:opacity-80 transition-opacity duration-[230ms]"
      >
        <img
          src="/apple-touch-icon.png"
          alt="Fin and Nance"
          class="h-24 w-auto"
        />
      </router-link>

      <nav class="flex items-center gap-4" aria-label="Main">
        <router-link
          v-for="navRoute in routes"
          :key="navRoute.path"
          :to="navRoute.path"
          :aria-current="route.path === navRoute.path ? 'page' : undefined"
          :class="[
            desktopRouteClasses,
            getRouteStateClasses(navRoute.path),
            'interactive-focus',
          ]"
        >
          {{ navRoute.name }}
        </router-link>
        <a
          v-for="social in socialLinks"
          :key="social.label"
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="`${social.label} (opens in new tab)`"
          class="interactive-focus rounded-md text-cobalt hover:text-torch-400 transition-colors duration-[230ms]"
        >
          <svg
            aria-hidden="true"
            class="w-8 h-8"
            fill="currentColor"
            :viewBox="social.viewBox ?? '0 0 24 24'"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path :d="social.iconPath" />
          </svg>
        </a>
      </nav>
    </div>
  </header>

  <!-- Mobile Menu Backdrop -->
  <Transition name="backdrop">
    <div
      v-if="isMenuOpen"
      @click="closeMenu"
      class="fixed inset-0 bg-gray-950/75 backdrop-blur-md z-30 md:hidden"
      aria-hidden="true"
    ></div>
  </Transition>

  <!-- Mobile Menu: Navigation Links -->
  <Transition name="menu">
    <nav
      v-if="isMenuOpen"
      ref="mobileMenuRef"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      class="fixed top-0 right-0 h-screen w-72 max-w-[85vw] bg-gray-900 shadow-xl z-40 md:hidden overflow-y-auto border-l border-gray-700"
      @keydown="handleMobileMenuKeydown"
    >
      <div class="flex justify-end p-4">
        <button
          ref="closeMenuRef"
          type="button"
          @click="closeMenu"
          class="p-2 text-gray-100 hover:text-cobalt-400 interactive-focus rounded-md transition-colors duration-[230ms] interactive-lift"
          aria-label="Close menu"
        >
          <svg
            aria-hidden="true"
            class="w-9 h-9"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
      <div class="flex flex-col items-center gap-4 px-6 pb-6">
        <router-link
          v-for="navRoute in routes"
          :key="navRoute.path"
          :to="navRoute.path"
          :aria-current="route.path === navRoute.path ? 'page' : undefined"
          @click="closeMenu"
          :class="[mobileRouteClasses, getRouteStateClasses(navRoute.path), 'interactive-focus']"
        >
          {{ navRoute.name }}
        </router-link>
        <div class="pt-2 w-full flex justify-center items-center gap-4">
          <a
            v-for="social in socialLinks"
            :key="social.label"
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`${social.label} (opens in new tab)`"
            class="interactive-focus rounded-md text-cobalt hover:text-torch-400 transition-colors duration-[230ms]"
          >
            <svg
              aria-hidden="true"
              class="w-9 h-9"
              fill="currentColor"
              :viewBox="social.viewBox ?? '0 0 24 24'"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path :d="social.iconPath" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  </Transition>
</template>

<script setup>
import { ref, watch, onUnmounted, nextTick } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isMenuOpen = ref(false);
const mobileMenuRef = ref(null);
const menuToggleRef = ref(null);
const closeMenuRef = ref(null);

const routes = [
  { path: "/about", name: "About the Author" },
  { path: "/books", name: "Books" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/fin_and_nance/",
    iconPath:
      "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
  },
  {
    label: "Amazon",
    href: "https://www.amazon.com/dp/B0G5PMK92F",
    viewBox: "0 0 448 512",
    iconPath:
      "M257.2 162.7c-48.7 1.8-169.5 15.5-169.5 117.5 0 109.5 138.3 114 183.5 43.2 6.5 10.2 35.4 37.5 45.3 46.8l56.8-56S341 288.9 341 261.4V114.3C341 89 316.5 32 228.7 32 140.7 32 94 87 94 136.3l73.5 6.8c16.3-49.5 54.2-49.5 54.2-49.5 40.7-.1 35.5 29.8 35.5 69.1zm0 86.8c0 80-84.2 68-84.2 17.2 0-47.2 50.5-56.7 84.2-57.8v40.6zm136 163.5c-7.7 10-70 67-174.5 67S34.2 408.5 9.7 379c-6.8-7.7 1-11.3 5.5-8.3C88.5 415.2 203 488.5 387.7 401c7.5-3.7 13.3 2 5.5 12zm39.8 2.2c-6.5 15.8-16 26.8-21.2 31-5.5 4.5-9.5 2.7-6.5-3.8s19.3-46.5 12.7-55c-6.5-8.3-37-4.3-48-3.2-10.8 1-13 2-14-.3-2.3-5.7 21.7-15.5 37.5-17.5 15.7-1.8 41-.8 46 5.7 3.7 5.1 0 27.1-6.5 43.1z",
  },
];

const desktopRouteClasses =
  "text-lg font-medium text-gray-100 transition-colors duration-[230ms] hover:text-cobalt-400";
const mobileRouteClasses =
  "text-2xl font-medium transition-colors duration-[230ms] py-3 text-center w-full text-gray-100 hover:text-cobalt-400";

const getRouteStateClasses = (path) =>
  route.path === path ? "text-butter border-b-2 border-terracotta" : "";

const focusCloseButton = () => {
  closeMenuRef.value?.focus();
};

const getMobileMenuFocusables = () => {
  if (!mobileMenuRef.value) {
    return [];
  }

  const selector =
    'a[href], button:not([disabled]), select:not([disabled]), textarea:not([disabled]), input:not([disabled])';

  return [...mobileMenuRef.value.querySelectorAll(selector)].filter(
    (el) => el.tabIndex !== -1,
  );
};

const handleMobileMenuKeydown = (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    closeMenu();
    return;
  }

  if (event.key !== "Tab") {
    return;
  }

  const focusables = getMobileMenuFocusables();
  if (focusables.length === 0) {
    return;
  }

  const first = focusables[0];
  const last = focusables[focusables.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
};

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const closeMenu = () => {
  isMenuOpen.value = false;
  nextTick(() => {
    menuToggleRef.value?.focus();
  });
};

watch(isMenuOpen, async (open) => {
  document.body.style.overflow = open ? "hidden" : "";
  if (open) {
    await nextTick();
    focusCloseButton();
  }
});

onUnmounted(() => {
  document.body.style.overflow = "";
});

watch(
  () => route.path,
  () => {
    closeMenu();
  },
);
</script>
