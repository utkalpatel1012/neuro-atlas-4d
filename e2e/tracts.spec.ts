import { test, expect } from '@playwright/test';

// P5: tract toggles by class; spinal levels labelled; budgets met (visible guards).
test('tract toggles by class', async ({ page }) => {
  await page.goto('/');
  for (const c of ['association', 'projection', 'commissural']) {
    await expect(page.getByLabel(`tract class ${c}`)).toBeVisible();
  }
  await page.getByLabel('tract class association').uncheck();
  await expect(page.getByTestId('tract-budget')).toContainText('2,500');
});

test('spinal levels labelled + brainstem seam', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('spinal-levels')).toContainText('C1');
  await expect(page.getByTestId('spinal-levels')).toContainText('S5');
  await expect(page.getByTestId('brainstem-seam')).toContainText('C1');
});
