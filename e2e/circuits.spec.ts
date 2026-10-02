import { test, expect } from '@playwright/test';

// P7 (F6): open circuit → play → pause → scrub.
test('circuit play → pause → scrub', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('circuit-count')).toContainText('circuits');
  await page.getByRole('button', { name: /Mesolimbic reward/ }).click();
  await expect(page.getByTestId('circuit-detail')).toBeVisible();
  await page.getByRole('button', { name: 'Play', exact: true }).click();
  await page.getByRole('button', { name: 'Pause', exact: true }).click();
  await page.getByLabel('Circuit scrubber').fill('500');
  await expect(page.getByTestId('step-caption')).not.toBeEmpty();
});
