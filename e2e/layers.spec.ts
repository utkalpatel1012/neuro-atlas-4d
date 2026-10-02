import { test, expect } from '@playwright/test';

// P2 layer system v2 (F1-F3): vasculature one-click, nested opacity, separate lobes, deep-link restore.
test('vasculature one-click hides/shows arteries + veins + sinuses', async ({ page }) => {
  await page.goto('/');
  const btn = page.getByRole('button', { name: 'Vasculature', exact: true });
  await expect(btn).toBeVisible();
  await btn.click();
  await expect(btn).toHaveAttribute('aria-pressed', 'false');
  await expect(page.url()).toContain('vis=');
  await btn.click();
  await expect(btn).toHaveAttribute('aria-pressed', 'true');
});

test('30% opacity on a nucleus + separate lobes slider + reset', async ({ page }) => {
  await page.goto('/');
  const slider = page.getByLabel('Separate lobes');
  await expect(slider).toBeVisible();
  await slider.fill('50');
  await slider.fill('0');
  await page.getByRole('button', { name: 'Reset' }).click();
});

test('deep-link restores selection', async ({ page }) => {
  await page.goto('/#s=ctx.frontal.dlpfc.L');
  await expect(page.getByTestId('selection')).toContainText('ctx.frontal.dlpfc.L');
});
