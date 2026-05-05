import { test, expect } from '@playwright/test';

test('verify admin product dialog has sale scheduling', async ({ page }) => {
  // Login first
  await page.goto('http://localhost:3000/login');
  await page.fill('input[type="email"]', 'admin@thuyhuong.com');
  await page.fill('input[type="password"]', 'admin');
  await page.click('button[type="submit"]');

  // Wait for navigation to admin
  await page.waitForURL('**/admin', { timeout: 10000 });

  // Open Product Management tab (it might be default, but let's be sure)
  await page.click('button:has-text("Sản phẩm")');

  // Click on "Sản phẩm mới"
  await page.click('button:has-text("Sản phẩm mới")');

  // Verify Sale fields - updating to match actual labels in app/admin/page.tsx
  // "Giá khuyến mãi (đ)"
  await expect(page.locator('label:has-text("Giá khuyến mãi")')).toBeVisible();
  // "Thời điểm bắt đầu sale"
  await expect(page.locator('label:has-text("Thời điểm bắt đầu sale")')).toBeVisible();
  // "Thời điểm kết thúc sale"
  await expect(page.locator('label:has-text("Thời điểm kết thúc sale")')).toBeVisible();

  // Check input types
  const startInput = page.locator('input[name="saleStart"]');
  const endInput = page.locator('input[name="saleEnd"]');
  await expect(startInput).toHaveAttribute('type', 'datetime-local');
  await expect(endInput).toHaveAttribute('type', 'datetime-local');

  await page.screenshot({ path: '/home/jules/verification/admin_product_dialog_v2.png', fullPage: true });
});
