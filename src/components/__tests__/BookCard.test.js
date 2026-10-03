import { beforeEach, describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter } from "vue-router";
import BookCard from "../BookCard.vue";

const mountWithRouter = (book) => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [{ path: "/", component: { template: "<div />" } }],
  });

  return mount(BookCard, {
    props: { book },
    global: { plugins: [router] },
  });
};

const baseBook = {
  title: "The Little Borrowing Brother",
  description: "Fin needs money fast, so he turns to his sister Nance.",
  topic: "Borrowing",
};

describe("BookCard", () => {
  beforeEach(() => {
    delete window.open;
  });

  it("renders the title and description", () => {
    const wrapper = mountWithRouter({ ...baseBook });

    expect(wrapper.text()).toContain(baseBook.title);
    expect(wrapper.text()).toContain(baseBook.description);
  });

  it("shows the cover image when a cover is provided", () => {
    const wrapper = mountWithRouter({
      ...baseBook,
      cover: "/assets/images/little-borrowing-brother-cover.jpg",
    });

    const cover = wrapper.find("img");
    expect(cover.exists()).toBe(true);
    expect(cover.attributes("src")).toBe("/assets/images/little-borrowing-brother-cover.jpg");
    expect(cover.attributes("alt")).toBe(`${baseBook.title} cover`);
  });

  it("falls back to a text placeholder when the cover is missing", () => {
    const wrapper = mountWithRouter({ ...baseBook });

    expect(wrapper.find("img").exists()).toBe(false);
    expect(wrapper.text()).toContain(baseBook.title);
  });

  it("shows the buy link for an available book", () => {
    const wrapper = mountWithRouter({
      ...baseBook,
      status: "available",
      buyLink: "https://www.amazon.com/dp/B0G5PMK92F",
    });

    const link = wrapper.find("a");
    expect(link.exists()).toBe(true);
    expect(link.attributes("href")).toBe("https://www.amazon.com/dp/B0G5PMK92F");
    expect(link.text()).toContain("Buy on Amazon");
  });

  it("shows Coming Soon for an in-production book", () => {
    const wrapper = mountWithRouter({ ...baseBook, status: "in-production" });

    expect(wrapper.find("a").exists()).toBe(false);
    expect(wrapper.text()).toContain("Coming Soon!");
  });
});
