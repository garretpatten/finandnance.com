import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter } from "vue-router";
import LandingView from "../LandingView.vue";
import AboutView from "../AboutView.vue";
import BooksView from "../BooksView.vue";

const mountView = async (component) => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/", component: { template: "<div />" } }],
  });
  await router.push("/");
  await router.isReady();

  return mount(component, { global: { plugins: [router] } });
};

describe("LandingView", () => {
  it("renders the hero and calls to action", async () => {
    const wrapper = await mountView(LandingView);

    expect(wrapper.find("h1").text()).toBe("Fin & Nance");
    expect(wrapper.text()).toContain("Explore the Books");
    expect(wrapper.text()).toContain("About the Author");
    expect(wrapper.findAll("img")).toHaveLength(1);
  });
});

describe("AboutView", () => {
  it("renders the author bio", async () => {
    const wrapper = await mountView(AboutView);

    expect(wrapper.find("h1").text()).toBe("About the Author");
    expect(wrapper.text()).toContain("Maureen Patten is the author");
    expect(wrapper.text()).toContain("Wofford College");
  });
});

describe("BooksView", () => {
  it("renders the shop heading and every book card", async () => {
    const wrapper = await mountView(BooksView);

    expect(wrapper.find("#store-heading").text()).toBe("The Fin & Nance Shop");
    expect(wrapper.findAllComponents({ name: "BookCard" })).toHaveLength(3);
    expect(wrapper.text()).toContain("The Little Borrowing Brother");
    expect(wrapper.text()).toContain("No Money Monday");
    expect(wrapper.text()).toContain("The Inflation Book");
  });

  it("offers buy links for available books and Coming Soon otherwise", async () => {
    const wrapper = await mountView(BooksView);

    const buyLinks = wrapper.findAll("a").filter((link) => link.text().includes("Buy on Amazon"));

    expect(buyLinks).toHaveLength(2);
    expect(wrapper.text()).toContain("Coming Soon!");
    expect(buyLinks.every((link) => link.attributes("target") === "_blank")).toBe(true);
  });
});
