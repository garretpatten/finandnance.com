import { beforeEach, describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter } from "vue-router";
import Header from "../Header.vue";

const buildRouter = () =>
  createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: "/", component: { template: "<div />" } },
      { path: "/books", component: { template: "<div />" } },
      { path: "/about", component: { template: "<div />" } },
    ],
  });

const mountHeader = async (initialPath = "/") => {
  const router = buildRouter(initialPath);
  await router.push(initialPath);
  await router.isReady();

  const wrapper = mount(Header, { global: { plugins: [router] } });
  return { wrapper, router };
};

describe("Header", () => {
  beforeEach(() => {
    document.body.style.overflow = "";
  });

  it("renders the main desktop navigation with route and social links", async () => {
    const { wrapper } = await mountHeader();
    const nav = wrapper.find('nav[aria-label="Main"]');

    expect(nav.exists()).toBe(true);
    expect(nav.text()).toContain("Home");
    expect(nav.text()).toContain("Books");
    expect(nav.text()).toContain("About the Author");
    expect(wrapper.findAll('a[href*="amazon.com"]')).toHaveLength(1);
    expect(wrapper.findAll('a[href*="instagram.com"]')).toHaveLength(1);

    const amazonLink = wrapper.find('a[href*="amazon.com"]');
    expect(amazonLink.attributes("aria-label")).toBe(
      "Amazon (opens in new tab)",
    );
    expect(amazonLink.attributes("target")).toBe("_blank");
    expect(amazonLink.attributes("rel")).toBe("noopener noreferrer");
    expect(amazonLink.attributes("title")).toBeUndefined();

    const emailLink = wrapper.find(
      'a[href="mailto:maureen@finandnance.com"]',
    );
    expect(emailLink.exists()).toBe(true);
    expect(emailLink.attributes("aria-label")).toBe("Email the author");
    expect(emailLink.attributes("title")).toBe("Email the author");
    expect(emailLink.attributes("target")).toBeUndefined();
    expect(emailLink.attributes("rel")).toBeUndefined();
  });

  it("marks the active desktop link with aria-current", async () => {
    const { wrapper } = await mountHeader("/books");

    const links = wrapper.findAll('nav[aria-label="Main"] a');
    const booksLink = links.find((link) => link.text() === "Books");

    expect(booksLink.attributes("aria-current")).toBe("page");
  });

  it("opens the mobile menu with a11y attributes and locks body scroll", async () => {
    const { wrapper } = await mountHeader();

    await wrapper.find('button[aria-label="Open menu"]').trigger("click");

    const dialog = wrapper.find('[role="dialog"]');
    expect(dialog.exists()).toBe(true);
    expect(dialog.attributes("aria-modal")).toBe("true");
    expect(dialog.attributes("aria-label")).toBe("Mobile navigation");

    const toggle = wrapper.find('button[aria-label="Open menu"]');
    expect(toggle.attributes("aria-expanded")).toBe("true");
    expect(document.body.style.overflow).toBe("hidden");
  });

  it("labels the mobile menu close button and restores scroll on close", async () => {
    const { wrapper } = await mountHeader();

    await wrapper.find('button[aria-label="Open menu"]').trigger("click");
    expect(wrapper.find('button[aria-label="Close menu"]').exists()).toBe(true);

    await wrapper.find('button[aria-label="Close menu"]').trigger("click");
    expect(document.body.style.overflow).toBe("");
    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
  });

  it("renders the email link in the mobile menu without a new-tab target", async () => {
    const { wrapper } = await mountHeader();

    await wrapper.find('button[aria-label="Open menu"]').trigger("click");

    const emailLink = wrapper.find(
      '[role="dialog"] a[href="mailto:maureen@finandnance.com"]',
    );
    expect(emailLink.exists()).toBe(true);
    expect(emailLink.attributes("aria-label")).toBe("Email the author");
    expect(emailLink.attributes("title")).toBe("Email the author");
    expect(emailLink.attributes("target")).toBeUndefined();
    expect(emailLink.attributes("rel")).toBeUndefined();
  });

  it("does not store the raw email address in the component source", () => {
    const source = readFileSync(resolve("src/components/Header.vue"), "utf8");

    expect(source).not.toMatch(/maureen@finandnance\.com/i);
    expect(source).not.toContain("mailto:maureen");
  });

  it("closes the menu on Escape", async () => {
    const { wrapper } = await mountHeader();

    await wrapper.find('button[aria-label="Open menu"]').trigger("click");
    await wrapper.find('[role="dialog"]').trigger("keydown", { key: "Escape" });

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
    expect(document.body.style.overflow).toBe("");
  });

  it("closes the menu when the route changes", async () => {
    const { wrapper, router } = await mountHeader();

    await wrapper.find('button[aria-label="Open menu"]').trigger("click");
    expect(wrapper.find('[role="dialog"]').exists()).toBe(true);

    await router.push("/books");
    await wrapper.vm.$nextTick();

    expect(wrapper.find('[role="dialog"]').exists()).toBe(false);
  });

  it("traps Tab focus inside the mobile menu", async () => {
    const { wrapper } = await mountHeader();

    await wrapper.find('button[aria-label="Open menu"]').trigger("click");
    const dialog = wrapper.find('[role="dialog"]');
    const focusables = dialog.element.querySelectorAll("a[href], button:not([disabled])");
    const last = focusables[focusables.length - 1];
    last.focus();

    await dialog.trigger("keydown", {
      key: "Tab",
      shiftKey: false,
    });

    expect(document.activeElement).not.toBe(last);
  });
});
