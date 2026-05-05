import { test, expect } from '@playwright/test';

test('verify homepage sale section and countdown', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Check for Thuy Huong branding
  await expect(page.locator('header')).toContainText('THỦY HƯƠNG');

  // Check for Daily Sale section - updated string
  const saleSection = page.getByText('Khuyến Mãi Hot Trong Ngày');
  await expect(saleSection).toBeVisible();

  // Check for countdown
  const countdown = page.locator('text=/\\d{2}:\\d{2}:\\d{2}/');
  await expect(countdown).toBeVisible();

  // Verify at least one sale product exists (Tiêu Đen Hạt should be on sale)
  const productPrice = page.locator('text=Tiêu Đen Hạt').locator('xpath=..').locator('text=50.000');
  await expect(productPrice).toBeVisible();

  const originalPrice = page.locator('text=Tiêu Đen Hạt').locator('xpath=..').locator('text=65.000');
  await expect(originalPrice).toBeVisible();

  await page.screenshot({ path: '/home/jules/verification/homepage_sale_v4.png', fullPage: true });
});
