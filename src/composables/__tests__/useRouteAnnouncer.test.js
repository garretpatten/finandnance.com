import { beforeEach, describe, expect, it } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter } from "vue-router";
import { useRouteAnnouncer } from "../useRouteAnnouncer";

const HOME_DESCRIPTION =
  "Fin and Nance — a children's book series on financial literacy.";
const BOOKS_DESCRIPTION = "Stories that teach saving and borrowing.";

const buildRouter = () =>
  createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: "/",
        name: "Home",
        meta: { title: "Home", description: HOME_DESCRIPTION },
        component: { template: "<div />" },
      },
      {
        path: "/books",
        name: "Books",
        meta: { title: "Books", description: BOOKS_DESCRIPTION },
        component: { template: "<div />" },
      },
    ],
  });

const seedHead = () => {
  document.head.innerHTML = `
    <meta name="description" content="" />
    <meta property="og:url" content="" />
    <link rel="canonical" href="" />
  `;
};

const metaDescription = () =>
  document.querySelector('meta[name="description"]').getAttribute("content");
const canonicalHref = () =>
  document.querySelector('link[rel="canonical"]').getAttribute("href");
const ogUrl = () =>
  document.querySelector('meta[property="og:url"]').getAttribute("content");

const mountWithAnnouncer = async (initialPath) => {
  const router = buildRouter();
  let announcement;

  const TestHost = {
    setup() {
      ({ announcement } = useRouteAnnouncer());
      return () => null;
    },
  };

  await router.push(initialPath);
  const wrapper = mount(TestHost, { global: { plugins: [router] } });
  await flushPromises();

  return { wrapper, announcement, router };
};

describe("useRouteAnnouncer", () => {
  beforeEach(() => {
    seedHead();
  });

  it("announces the home page and titles the document", async () => {
    const { wrapper, announcement } = await mountWithAnnouncer("/");

    expect(document.title).toBe("Fin and Nance");
    expect(announcement.value).toBe("Home page loaded");

    wrapper.unmount();
  });

  it("announces inner pages with the route meta title", async () => {
    const { wrapper, announcement, router } = await mountWithAnnouncer("/");
    await router.push("/books");
    await flushPromises();

    expect(document.title).toBe("Books — Fin and Nance");
    expect(announcement.value).toBe("Books page loaded");

    wrapper.unmount();
  });

  it("syncs the meta description, canonical link, and og:url to the route", async () => {
    const { wrapper, router } = await mountWithAnnouncer("/");

    expect(metaDescription()).toBe(HOME_DESCRIPTION);
    expect(canonicalHref()).toBe("https://finandnance.com/");
    expect(ogUrl()).toBe("https://finandnance.com/");

    await router.push("/books");
    await flushPromises();

    expect(metaDescription()).toBe(BOOKS_DESCRIPTION);
    expect(canonicalHref()).toBe("https://finandnance.com/books");
    expect(ogUrl()).toBe("https://finandnance.com/books");

    wrapper.unmount();
  });

  it("falls back to the default description when a route has none", async () => {
    const router = buildRouter();
    delete router.options.routes[1].meta.description;

    const TestHost = {
      setup() {
        useRouteAnnouncer();
        return () => null;
      },
    };

    await router.push("/books");
    const wrapper = mount(TestHost, { global: { plugins: [router] } });
    await flushPromises();

    expect(metaDescription()).toBe(HOME_DESCRIPTION);

    wrapper.unmount();
  });
});
