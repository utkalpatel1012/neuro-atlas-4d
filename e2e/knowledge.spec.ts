import { test, expect } from '@playwright/test';

// P8 (F7, F8): open a disorder tab; run a quiz.
test('disorder tabs + tour', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('disorder-count')).toContainText('P1 packs');
  await page.getByRole('button', { name: /Schizophrenia/ }).click();
  await expect(page.getByTestId('disorder-detail')).toBeVisible();
  await expect(page.getByTestId('draft-badge').first()).toBeVisible();
  await page.getByRole('tab', { name: 'circuits' }).click();
  await expect(page.getByTestId('disorder-tab-body')).not.toBeEmpty();
  await expect(page.getByTestId('guided-tour')).toContainText('Step 1/');
});

test('MCQ quiz + viva + flashcards run offline', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('mcq')).toBeVisible();
  await expect(page.getByTestId('quiz-score')).toContainText('Score');
  await expect(page.getByTestId('viva-prompt')).not.toBeEmpty();
  await expect(page.getByTestId('flash-due')).toContainText('due');
});
