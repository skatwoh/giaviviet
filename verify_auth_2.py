import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Go to home
        await page.goto("http://localhost:3000")
        await page.wait_for_timeout(3000)

        # Take home screenshot
        await page.screenshot(path="/home/jules/verification/home_auth_initial.png")

        # Check if login link exists
        try:
            await page.click('button:has-text("Tài khoản")')
            await page.wait_for_timeout(1000)
            await page.screenshot(path="/home/jules/verification/account_dropdown_open.png")
        except Exception as e:
            print(f"Error clicking account: {e}")

        await browser.close()

if __name__ == "__main__":
    asyncio.run(main())
