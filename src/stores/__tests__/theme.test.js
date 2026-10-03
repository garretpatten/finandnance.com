import { beforeEach, describe, expect, it } from "vitest";
import { createPinia, setActivePinia } from "pinia";
import { useThemeStore } from "../theme";

describe("useThemeStore", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    document.documentElement.classList.remove("dark");
  });

  it("does not touch <html> before initialization", () => {
    useThemeStore();

    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("applies the dark theme to <html> on init", () => {
    const store = useThemeStore();

    store.initTheme();

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("keeps the dark theme when init runs again", () => {
    const store = useThemeStore();

    store.initTheme();
    store.initTheme();

    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
