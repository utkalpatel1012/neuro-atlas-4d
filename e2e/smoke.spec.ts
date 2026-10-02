import { test, expect } from '@playwright/test';

// P1 regression E2E: pre-existing P0 features (first paint + educational badge + deep-link restore).
test('first paint + deep-link restore', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'NeuroAtlas 4D' })).toBeVisible();
  await expect(page.getByText('Educational use — not for clinical decisions').first()).toBeVisible();
  await expect(page.getByTestId('brain-canvas')).toBeVisible();
  await page.goto('/#s=ctx.frontal.dlpfc.L');
  await expect(page.getByTestId('selection')).toContainText('ctx.frontal.dlpfc.L');
});
