import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useMenuStore } from "../menu";

describe("useMenuStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it("starts closed", () => {
    const menu = useMenuStore();

    expect(menu.isOpen).toBe(false);
  });

  it("opens, closes, and toggles", () => {
    const menu = useMenuStore();

    menu.open();
    expect(menu.isOpen).toBe(true);

    menu.close();
    expect(menu.isOpen).toBe(false);

    menu.toggle();
    expect(menu.isOpen).toBe(true);

    menu.toggle();
    expect(menu.isOpen).toBe(false);
  });
});
