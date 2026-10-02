import { test, expect } from '@playwright/test';

// P6 (F5): one-button vasculature toggle; territory overlay; vessel cards render with fidelity.
test('vasculature toggle + territory overlay + vessel card', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Vasculature', exact: true }).click();
  await page.getByRole('button', { name: 'Vasculature', exact: true }).click();
  await page.getByLabel('Territory overlay').check();
  await page.getByRole('button', { name: /Internal carotid artery/ }).click();
  await expect(page.getByTestId('vessel-card')).toBeVisible();
  await expect(page.getByTestId('vessel-fidelity')).toContainText('Fidelity:');
});
