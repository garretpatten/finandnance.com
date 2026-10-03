import { describe, expect, it } from "vitest";
import router from "../index";

const allPaths = ["/", "/about", "/books"];

describe("router", () => {
  it("maps every route to an existing name", () => {
    const names = router.getRoutes().map((route) => route.name);

    expect(names).toEqual(["Home", "About the Author", "Books"]);
  });

  it("resolves each document path", () => {
    for (const path of allPaths) {
      const resolved = router.resolve(path);

      expect(resolved.matched).toHaveLength(1);
      expect(resolved.path).toBe(path);
    }
  });

  it("sets a page title on every route meta", () => {
    for (const path of allPaths) {
      const resolved = router.resolve(path);

      expect(resolved.meta.title).toBeTypeOf("string");
      expect(resolved.meta.title).not.toBe("");
    }
  });

  it("lazy views resolve to the eagerly imported modules", () => {
    const components = router.getRoutes().map((route) => route.components.default);

    for (const component of components) {
      expect(component).toBeTypeOf("object");
      expect(component.render ?? component.setup).toBeDefined();
    }
  });

  it("scrolls to the top before navigation is confirmed", async () => {
    const position = await router.options.scrollBehavior(
      { path: "/books" },
      { path: "/" },
      undefined,
    );

    expect(position).toEqual({ top: 0, left: 0 });
  });

  it("restores the saved scroll position", async () => {
    const savedPosition = { top: 240, left: 0 };
    const position = await router.options.scrollBehavior(
      { path: "/books" },
      { path: "/" },
      savedPosition,
    );

    expect(position).toBe(savedPosition);
  });
});
