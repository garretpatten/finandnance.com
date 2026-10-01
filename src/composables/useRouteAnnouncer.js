import { ref, watch } from "vue";
import { useRoute } from "vue-router";

/**
 * Keeps the document title in sync with the route and announces page loads
 * through an aria-live region. Focus management for view changes lives in
 * App.vue — which deliberately does not move focus: the header persists
 * across views, so the activated nav link keeps focus after the new view
 * renders, and the skip link is the only path that focuses `#main-content`.
 */
export function useRouteAnnouncer() {
  const route = useRoute();
  const announcement = ref("");

  watch(
    () => route.fullPath,
    () => {
      const pageTitle = route.meta?.title ?? route.name ?? "Page";
      document.title =
        route.path === "/" ? "Fin and Nance" : `${pageTitle} — Fin and Nance`;
      announcement.value = `${pageTitle} page loaded`;
    },
    { immediate: true },
  );

  return { announcement };
}
