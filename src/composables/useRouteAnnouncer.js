import { ref, watch, nextTick } from "vue";
import { useRoute } from "vue-router";

/**
 * Announces route changes for screen readers and moves focus to main content.
 */
export function useRouteAnnouncer() {
  const route = useRoute();
  const announcement = ref("");

  const updatePageMeta = async (to) => {
    const pageTitle = to.meta?.title ?? to.name ?? "Page";
    document.title =
      to.path === "/" ? "Fin and Nance" : `${pageTitle} — Fin and Nance`;
    announcement.value = `${pageTitle} page loaded`;

    await nextTick();
    const main = document.getElementById("main-content");
    if (main instanceof HTMLElement) {
      main.focus({ preventScroll: true });
    }
  };

  watch(
    () => route.fullPath,
    () => updatePageMeta(route),
    { immediate: true },
  );

  return { announcement };
}
