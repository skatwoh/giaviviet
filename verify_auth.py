import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Go to home
        await page.goto("http://localhost:3000")
        await page.wait_for_timeout(2000)
        await page.screenshot(path="/home/jules/verification/home_auth_initial.png")

        # Go to register
        await page.goto("http://localhost:3000/register")
        await page.fill('input[id="name"]', "Người Dùng Thử")
        await page.fill('input[id="email"]', "testuser@example.com")
        await page.fill('input[id="password"]', "password123")
        await page.fill('input[id="confirmPassword"]', "password123")
        await page.click('button[type="submit"]')

        await page.wait_for_timeout(2000)
        await page.screenshot(path="/home/jules/verification/after_register.png")

        # Verify on profile
        await page.goto("http://localhost:3000/profile")
        await page.wait_for_timeout(2000)
        await page.screenshot(path="/home/jules/verification/profile_page.png")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
