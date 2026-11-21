import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const SITE_URL = 'https://finandnance.com';
const FALLBACK_DESCRIPTION = "Fin and Nance — a children's book series on financial literacy.";

/**
 * Keeps the document title, meta description, and canonical/og:url in
 * sync with the route, and announces page loads through an aria-live
 * region. Focus management for view changes lives in App.vue — which
 * deliberately does not move focus: the header persists across views,
 * so the activated nav link keeps focus after the new view renders,
 * and the skip link is the only path that focuses `#main-content`.
 */
export function useRouteAnnouncer() {
  const route = useRoute();
  const announcement = ref('');

  const setMetaContent = (selector, content) => {
    document.querySelector(selector)?.setAttribute('content', content);
  };

  const setCanonicalUrl = (path) => {
    const url = `${SITE_URL}${path}`;
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', url);
    setMetaContent('meta[property="og:url"]', url);
  };

  watch(
    () => route.fullPath,
    () => {
      const pageTitle = route.meta?.title ?? route.name ?? 'Page';
      document.title = route.path === '/' ? 'Fin and Nance' : `${pageTitle} — Fin and Nance`;
      announcement.value = `${pageTitle} page loaded`;
      setMetaContent('meta[name="description"]', route.meta?.description ?? FALLBACK_DESCRIPTION);
      setCanonicalUrl(route.path);
    },
    { immediate: true },
  );

  return { announcement };
}
