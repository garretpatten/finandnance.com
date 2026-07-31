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
        <span class="font-heading text-xl font-bold text-gray-100">Fin and Nance</span>
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
          class="w-8 h-8"
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
        <span class="font-heading text-2xl font-bold text-gray-100">Fin and Nance</span>
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
            class="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 24 24"
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
            class="w-7 h-7"
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
              class="w-7 h-7"
              fill="currentColor"
              viewBox="0 0 24 24"
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
    iconPath:
      "M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.582l.315-.118c.138-.053.209-.029.238.074.031.105.052.21.052.322 0 .127-.032.254-.093.37-.268.52-.784.92-1.556 1.208-2.89 1.108-5.86 1.65-8.909 1.65-4.236 0-8.376-.951-12.397-2.85-.18-.085-.281-.187-.315-.307-.05-.18-.01-.36.127-.54zm6.823-5.8c0-.84.207-1.578.62-2.21.413-.632.973-1.127 1.683-1.48.71-.355 1.483-.532 2.318-.532.907 0 1.68.17 2.32.513.64.342 1.112.795 1.418 1.36.305.564.458 1.183.458 1.856 0 .697-.157 1.332-.47 1.905-.313.572-.75 1.045-1.312 1.418-.562.374-1.194.597-1.897.668v1.92c0 .122-.04.22-.12.294-.08.075-.19.112-.33.112-.14 0-.25-.037-.33-.112-.08-.074-.12-.172-.12-.294v-1.92c-.69-.07-1.31-.29-1.86-.657-.55-.368-.98-.84-1.29-1.417-.31-.577-.47-1.214-.47-1.91zm2.78.024c0 .64.17 1.17.51 1.59.34.42.77.68 1.29.78v-4.6c-.5.1-.91.36-1.23.78-.32.42-.49.94-.49 1.57v-.12h.92zm7.07.12c-.05.085-.12.127-.22.127-.09 0-.18-.04-.26-.12-.08-.08-.15-.2-.21-.36-.24-.66-.55-1.2-.93-1.62-.38-.42-.76-.63-1.14-.63-.18 0-.33.07-.45.21-.12.14-.18.32-.18.54 0 .22.06.42.18.6.12.18.35.38.69.6l.78.5c.72.46 1.25.93 1.59 1.42.34.49.51 1.02.51 1.6 0 .62-.18 1.18-.54 1.68-.36.5-.83.9-1.41 1.18-.58.28-1.19.42-1.83.42-.66 0-1.27-.14-1.83-.42-.56-.28-1.01-.67-1.35-1.16-.34-.49-.51-.99-.51-1.5 0-.09.03-.17.09-.23.06-.06.14-.09.23-.09.1 0 .18.04.24.12.06.08.13.2.2.36.3.66.66 1.18 1.08 1.56.42.38.85.57 1.29.57.24 0 .43-.09.57-.26.14-.17.21-.39.21-.66 0-.25-.07-.47-.21-.66-.14-.19-.37-.39-.69-.6l-.84-.54c-.68-.44-1.18-.88-1.5-1.33-.32-.45-.48-.95-.48-1.49 0-.56.16-1.07.48-1.52.32-.45.75-.8 1.29-1.06.54-.26 1.12-.39 1.74-.39.6 0 1.16.13 1.68.39.52.26.94.62 1.26 1.08.32.46.5.93.54 1.42-.01.09-.05.17-.12.24z",
  },
];

const desktopRouteClasses =
  "text-md font-medium text-gray-100 transition-colors duration-[230ms] hover:text-cobalt-400";
const mobileRouteClasses =
  "text-xl font-medium transition-colors duration-[230ms] py-3 text-center w-full text-gray-100 hover:text-cobalt-400";

const getRouteStateClasses = (path) =>
  route.path === path ? "text-sun-400 border-b-2 border-torch-400" : "";

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
