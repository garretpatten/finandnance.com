import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { createMemoryHistory, createRouter } from "vue-router";
import Footer from "../Footer.vue";

describe("Footer", () => {
  it("renders the current year with the copyright line", () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: "/", component: { template: "<div />" } }],
    });
    const wrapper = mount(Footer, { global: { plugins: [router] } });

    expect(wrapper.text()).toContain(`© ${new Date().getFullYear()}`);
    expect(wrapper.text()).toContain("Maureen Patten. All rights reserved.");
  });
});
