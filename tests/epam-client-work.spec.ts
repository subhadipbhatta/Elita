import { test, expect } from '@playwright/test';

/**
 * Scenario: Verify EPAM Client Work page via Services
 * Steps:
 * 1. Navigate to https://www.epam.com/
 * 2. Select "Services" from the header menu
 * 3. Click the "Explore Our Client Work" link
 * 4. Verify that the "Client Work" text is visible on the page
 */

test.describe('EPAM Client Work navigation', () => {
  test('Navigate via Services and verify Client Work page', async ({ page }) => {
    // 1. Navigate to home
    await page.goto('https://www.epam.com/');

    // Handle Cloudflare challenge if present (wait for it to disappear)
    const challengeText = page.getByText('Verifying you are human', { exact: false });
    if (await challengeText.count()) {
      await challengeText.first().waitFor({ state: 'hidden', timeout: 30000 }).catch(() => {});
    }

    // 2. Click "Services" in header (use accessible role)
    await page.getByRole('link', { name: 'Services' }).first().click();
    await expect(page).toHaveURL(/\/services$/);

    // 3. Click "Explore Our Client Work" link on Services page
    await page.getByRole('link', { name: 'Explore Our Client Work' }).click();
    await expect(page).toHaveURL(/\/services\/client-work$/);

    // 4. Verify "Client Work" text is visible
    await expect(page.locator('main')).toContainText(/Client\s*Work/i);
  });
});
