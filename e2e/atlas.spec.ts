import { test, expect } from '@playwright/test';

// P4: Atlas-exact vs Gross anatomy mode switch (explicit, never silent).
test('anatomy mode switch is explicit', async ({ page }) => {
  await page.goto('/');
  const gross = page.getByRole('button', { name: 'Gross anatomy', exact: true });
  const exact = page.getByRole('button', { name: 'Atlas-exact', exact: true });
  await expect(gross).toBeVisible();
  await expect(exact).toBeVisible();
  await exact.click();
  await expect(exact).toHaveAttribute('aria-pressed', 'true');
});
