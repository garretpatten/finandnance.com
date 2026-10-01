import { test, expect, settle } from './setup.js';

/**
 * Full-site accessibility audit for finandnance.com.
 *
 * Every route is audited at rest on its own; the interactive state (mobile
 * menu) is audited after interaction. Playwright runs the whole suite once per
 * project defined in playwright.config.js (desktop and mobile Chromium).
 */

test.describe('static routes', () => {
  for (const { path, heading, label } of [
    { path: '/', heading: 'Fin & Nance', label: 'home' },
    { path: '/about', heading: 'About the Author', label: 'about' },
    { path: '/books', heading: 'Books', label: 'books' },
  ]) {
    test(`${label} page has no axe violations`, async ({ page }) => {
      await page.goto(path);
      const headingLocator = page.getByRole('heading', {
        name: heading,
        exact: true,
      });
      await expect(headingLocator).toBeAttached();
      await settle(page);
      await page.assertAxeClean(`route:${label}`);
    });
  }
});

test.describe('interactive states', () => {
  /**
   * Polls the active element until it matches the app's SPA focus target:
   * the persistent `#main-content` region (optionally also the page heading
   * before the announcement settles in).
   */
  const expectEventuallyFocused = async (page, { allowH1 = true } = {}) => {
    await expect
      .poll(() =>
        page.evaluate((checkH1) => {
          const active = document.activeElement;
          if (!active) return null;
          if (active.id === 'main-content') return 'main';
          if (checkH1 && active.tagName === 'H1') return 'heading';
          return null;
        }, allowH1),
      )
      .toBeTruthy();
  };

  test('mobile menu open has no axe violations', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto('/');
    const menuToggle = page.getByRole('button', { name: 'Open menu' });
    await menuToggle.click();
    const menu = page.getByRole('dialog', { name: 'Mobile navigation' });
    await expect(menu).toBeVisible();
    await settle(page);
    await page.assertAxeClean('mobile-menu:open');
  });

  test('focus stays on the activated nav link after navigation', async ({ page }) => {
    const isMobile = test.info().project.name.startsWith('mobile');
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Fin & Nance', exact: true })).toBeAttached();

    // Full refresh: after the initial route announcement, focus settles on
    // the main content region or the page heading (never a hidden element).
    const initialFocus = await page.evaluate(() => document.activeElement?.tagName);
    expect(['BODY', 'MAIN', 'H1']).toContain(initialFocus);

    if (isMobile) {
      await page.getByRole('button', { name: 'Open menu' }).click();
    }
    const aboutLink = page.getByRole('link', { name: 'About the Author' }).first();
    await aboutLink.click();
    await expect(page).toHaveURL(/\/about$/);

    if (isMobile) {
      // The menu (and its links) unmounts without focus management; focus is
      // re-established on main content by the route announcement.
    }

    // Route announcements move focus to main content, so focus must never
    // be lost to <body> or land on hidden elements.
    await expectEventuallyFocused(page, { allowH1: false });
    await settle(page);
  });

  test('focus follows successive navigations through the nav', async ({ page }) => {
    const isMobile = test.info().project.name.startsWith('mobile');
    await page.goto('/');

    const openMenuIfMobile = async () => {
      if (isMobile) {
        await page.getByRole('button', { name: 'Open menu' }).click();
      }
    };
    const expectFocusOnMainContent = async () => {
      await expectEventuallyFocused(page, { allowH1: false });
    };

    await openMenuIfMobile();
    await page.getByRole('link', { name: 'Books' }).first().click();
    await expect(page).toHaveURL(/\/books$/);
    await expectFocusOnMainContent();

    await openMenuIfMobile();
    await page.getByRole('link', { name: 'About the Author' }).first().click();
    await expect(page).toHaveURL(/\/about$/);
    await expectFocusOnMainContent();
    await settle(page);
  });

  test('keyboard activation of the skip link reaches main content', async ({ page }) => {
    await page.goto('/');
    await expect.poll(() => page.evaluate(() => document.activeElement?.tagName)).toBeTruthy();
    await page.getByRole('link', { name: 'Skip to main content' }).focus();
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#main-content/);
    await expect(page.locator('#main-content')).toBeFocused();
  });
});
