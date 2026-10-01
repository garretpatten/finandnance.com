import { test, expect, settle } from "./setup.js";

/**
 * Full-site accessibility audit for finandnance.com.
 *
 * Every route is audited at rest on its own; the interactive state (mobile
 * menu) is audited after interaction. Playwright runs the whole suite once per
 * project defined in playwright.config.js (desktop and mobile Chromium).
 *
 * Focus model (mirrors garretpatten.com): the header persists across views, so
 * client-side navigation never moves focus — the activated nav link keeps it.
 * Readonly content (headings, text) is never focused; the skip link is the
 * only path that programmatically focuses `#main-content`, and route changes
 * are announced through the aria-live region in App.vue.
 */

test.describe("static routes", () => {
  for (const { path, heading, label } of [
    { path: "/", heading: "Fin & Nance", label: "home" },
    { path: "/about", heading: "About the Author", label: "about" },
    { path: "/books", heading: "Books", label: "books" },
  ]) {
    test(`${label} page has no axe violations`, async ({ page }) => {
      await page.goto(path);
      const headingLocator = page.getByRole("heading", {
        name: heading,
        exact: true,
      });
      await expect(headingLocator).toBeAttached();
      await settle(page);
      await page.assertAxeClean(`route:${label}`);
    });
  }
});

test.describe("interactive states", () => {
  test("mobile menu open has no axe violations", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto("/");
    const menuToggle = page.getByRole("button", { name: "Open menu" });
    await menuToggle.click();
    const menu = page.getByRole("dialog", { name: "Mobile navigation" });
    await expect(menu).toBeVisible();
    await settle(page);
    await page.assertAxeClean("mobile-menu:open");
  });

  test("focus stays on the activated nav link after navigation", async ({
    page,
  }) => {
    const isMobile = test.info().project.name.startsWith("mobile");
    await page.goto("/");
    await expect(
      page.getByRole("heading", { name: "Fin & Nance", exact: true }),
    ).toBeAttached();

    // Full refresh: focus starts at the document, never on readonly content.
    const initialFocus = await page.evaluate(
      () => document.activeElement?.tagName,
    );
    expect(initialFocus).toBe("BODY");

    if (isMobile) {
      await page.getByRole("button", { name: "Open menu" }).click();
    }
    const aboutLink = page
      .getByRole("link", { name: "About the Author" })
      .first();
    await aboutLink.click();
    await expect(page).toHaveURL(/\/about$/);

    if (isMobile) {
      // The menu (and its links) unmounts; focus lands on the persistent
      // menu toggle instead of being lost.
      await expect(
        page.getByRole("button", { name: "Open menu" }),
      ).toBeFocused();
    } else {
      // The header persists across views, so focus stays on the link the
      // user activated.
      await expect(aboutLink).toBeFocused();
    }

    // Readonly content must never hold focus after navigation.
    const activeTag = await page.evaluate(
      () => document.activeElement?.tagName,
    );
    expect(activeTag, "focus must not fall on readonly content").not.toBe(
      "H1",
    );
    await settle(page);
  });

  test("focus follows successive navigations through the nav", async ({
    page,
  }) => {
    const isMobile = test.info().project.name.startsWith("mobile");
    await page.goto("/");

    const openMenuIfMobile = async () => {
      if (isMobile) {
        await page.getByRole("button", { name: "Open menu" }).click();
      }
    };
    const expectFocusAfterNav = async (linkName) => {
      if (isMobile) {
        await expect(
          page.getByRole("button", { name: "Open menu" }),
        ).toBeFocused();
      } else {
        await expect(
          page.getByRole("link", { name: linkName }).first(),
        ).toBeFocused();
      }
    };

    await openMenuIfMobile();
    await page.getByRole("link", { name: "Books" }).first().click();
    await expect(page).toHaveURL(/\/books$/);
    await expectFocusAfterNav("Books");

    await openMenuIfMobile();
    await page
      .getByRole("link", { name: "About the Author" })
      .first()
      .click();
    await expect(page).toHaveURL(/\/about$/);
    await expectFocusAfterNav("About the Author");
    await settle(page);
  });

  test("keyboard tab order reaches main content", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Tab"); // skip link
    await expect(
      page.getByRole("link", { name: "Skip to main content" }),
    ).toBeFocused();
    await page.keyboard.press("Enter");
    await expect(page).toHaveURL(/#main-content/);
    await expect(page.locator("#main-content")).toBeFocused();
  });
});
