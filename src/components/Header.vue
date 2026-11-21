<template>
  <header :inert="isMenuOpen || undefined" class="mb-8 pb-6 relative z-20 px-4 py-3">
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
          src="/assets/images/coin.webp"
          alt="Fin and Nance"
          width="206"
          height="192"
          class="h-20 w-auto"
        />
      </router-link>

      <button
        v-show="!isMenuOpen"
        ref="menuToggleRef"
        class="p-2 text-gray-100 hover:text-cobalt-400 interactive-focus rounded-md transition-colors duration-[230ms] relative z-50 interactive-lift"
        aria-label="Open menu"
        :aria-expanded="isMenuOpen"
        @click="toggleMenu"
      >
        <svg
          aria-hidden="true"
          class="w-14 h-14"
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
          src="/assets/images/coin.webp"
          alt="Fin and Nance"
          width="206"
          height="192"
          class="h-24 w-auto"
        />
      </router-link>

      <nav class="flex items-center gap-4" aria-label="Main">
        <router-link
          v-for="navRoute in navRoutes"
          :key="navRoute.path"
          :to="navRoute.path"
          :aria-current="route.path === navRoute.path ? 'page' : undefined"
          :class="[desktopRouteClasses, getRouteStateClasses(navRoute.path), 'interactive-focus']"
        >
          {{ navRoute.name }}
        </router-link>
        <a
          v-for="social in socialLinks"
          :key="social.label"
          :href="social.href"
          :target="social.isEmail ? undefined : '_blank'"
          :rel="social.isEmail ? undefined : 'noopener noreferrer'"
          :aria-label="social.ariaLabel ?? `${social.label} (opens in new tab)`"
          :title="social.ariaLabel ?? undefined"
          class="interactive-focus inline-flex items-center justify-center rounded-md text-gray-100 hover:text-torch-300 transition-colors duration-[230ms]"
        >
          <svg
            aria-hidden="true"
            class="w-8 h-8 align-middle"
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
      role="presentation"
      class="fixed inset-0 bg-gray-950/75 backdrop-blur-md z-30 md:hidden"
      aria-hidden="true"
      @click="closeMenu"
    ></div>
  </Transition>

  <Transition name="menu">
    <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions (modal dialog keydown trap; focus lives on close button) -->
    <div
      v-if="isMenuOpen"
      ref="mobileMenuRef"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation"
      class="fixed top-0 right-0 h-screen w-72 max-w-[85vw] bg-gray-900 shadow-xl z-40 md:hidden overflow-y-auto border-l border-gray-700"
      @keydown="handleMobileMenuKeydown"
    >
      <nav aria-label="Mobile" class="flex flex-col h-full">
        <div class="flex justify-end p-4">
          <button
            ref="closeMenuRef"
            type="button"
            class="p-2 text-gray-100 hover:text-cobalt-400 interactive-focus rounded-md transition-colors duration-[230ms] interactive-lift"
            aria-label="Close menu"
            @click="closeMenu"
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
            v-for="navRoute in navRoutes"
            :key="navRoute.path"
            :to="navRoute.path"
            :aria-current="route.path === navRoute.path ? 'page' : undefined"
            :class="[mobileRouteClasses, getRouteStateClasses(navRoute.path), 'interactive-focus']"
            @click="closeMenu"
          >
            {{ navRoute.name }}
          </router-link>
          <div class="pt-2 w-full flex justify-center items-center gap-4">
            <a
              v-for="social in socialLinks"
              :key="social.label"
              :href="social.href"
              :target="social.isEmail ? undefined : '_blank'"
              :rel="social.isEmail ? undefined : 'noopener noreferrer'"
              :aria-label="social.ariaLabel ?? `${social.label} (opens in new tab)`"
              :title="social.ariaLabel ?? undefined"
              class="interactive-focus inline-flex items-center justify-center rounded-md text-gray-100 hover:text-torch-300 transition-colors duration-[230ms]"
            >
              <svg
                aria-hidden="true"
                class="w-9 h-9 align-middle"
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
    </div>
  </Transition>
</template>

<script setup>
import { ref, watch, onUnmounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useMediaQuery } from '@vueuse/core';
import { useMenuStore } from '../stores/menu';
import { routes as appRoutes } from '../router';
import { socialLinks } from '../data/socials';

const route = useRoute();
const menuStore = useMenuStore();
const { isOpen: isMenuOpen } = storeToRefs(menuStore);
const mobileMenuRef = ref(null);
const menuToggleRef = ref(null);
const closeMenuRef = ref(null);

/* Close the dialog if the viewport grows past md while it is open;
   the menu UI is hidden at that width, so leaving it open would lock
   body scroll and trap focus in a hidden dialog. */
const isDesktopViewport = useMediaQuery('(min-width: 768px)');
watch(isDesktopViewport, (isDesktop) => {
  if (isDesktop) {
    menuStore.close();
  }
});

/* Nav entries derive from the route table so labels and paths cannot
   drift from src/router/index.js. */
const navRoutes = appRoutes.map(({ path, meta }) => ({
  path,
  name: meta.title,
}));

const desktopRouteClasses =
  'text-lg font-medium text-gray-100 transition-colors duration-[230ms] hover:text-cobalt-400';
const mobileRouteClasses =
  'text-2xl font-medium transition-colors duration-[230ms] py-3 text-center w-full text-gray-100 hover:text-cobalt-400';

const getRouteStateClasses = (path) =>
  route.path === path ? 'text-butter border-b-2 border-terracotta' : '';

const focusCloseButton = () => {
  closeMenuRef.value?.focus();
};

const getMobileMenuFocusables = () => {
  if (!mobileMenuRef.value) {
    return [];
  }

  const selector =
    'a[href], button:not([disabled]), select:not([disabled]), textarea:not([disabled]), input:not([disabled])';

  return [...mobileMenuRef.value.querySelectorAll(selector)].filter((el) => el.tabIndex !== -1);
};

const handleMobileMenuKeydown = (event) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    closeMenu();
    return;
  }

  if (event.key !== 'Tab') {
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
  menuStore.toggle();
};

const closeMenu = () => {
  menuStore.close();
  nextTick(() => {
    menuToggleRef.value?.focus();
  });
};

watch(isMenuOpen, async (open) => {
  document.body.style.overflow = open ? 'hidden' : '';
  if (open) {
    await nextTick();
    focusCloseButton();
  }
});

onUnmounted(() => {
  document.body.style.overflow = '';
});

watch(
  () => route.path,
  () => {
    closeMenu();
  },
);
</script>
