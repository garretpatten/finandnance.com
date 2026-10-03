import { describe, expect, it } from "vitest";
import { flushPromises, mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter } from "vue-router";
import { useRouteAnnouncer } from "../useRouteAnnouncer";

const buildRouter = () =>
  createRouter({
    history: createMemoryHistory(),
    routes: [
      {
        path: "/",
        name: "Home",
        meta: { title: "Home" },
        component: { template: "<div />" },
      },
      {
        path: "/books",
        name: "Books",
        meta: { title: "Books" },
        component: { template: "<div />" },
      },
    ],
  });

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
});
