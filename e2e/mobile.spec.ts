import { test, expect } from '@playwright/test';

// P9: 375px mobile viewport — panels usable, tree scrolls, no horizontal overflow.
test.use({ viewport: { width: 375, height: 812 } });
test('375px mobile layout usable', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'NeuroAtlas 4D' })).toBeVisible();
  await expect(page.getByLabel('Search structures')).toBeVisible();
  await expect(page.getByTestId('brain-canvas')).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});
