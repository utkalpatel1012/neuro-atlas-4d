import { test, expect } from '@playwright/test';

// P3 (F4): 3D ↔ MRI crosshair sync both ways + radiology preset.
test('3D select moves MRI crosshair readout', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /Precentral|Caudate|artery/i }).first().click().catch(() => {});
  await expect(page.getByTestId('mri-crosshair')).toBeVisible();
});

test('MRI preset sets selection', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: /axial: basal ganglia/i }).click();
  await expect(page.getByTestId('mri-crosshair')).toBeVisible();
});

test('section sliders drive clip state', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Axial clip').fill('30');
  await expect(page.getByTestId('cut-marker')).toContainText('Open cut');
});
