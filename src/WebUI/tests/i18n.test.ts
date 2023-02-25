import { expect, test } from '@playwright/test';

const routesToTest = ['/'];
const localesToTest = ['en'];

for (const locale of localesToTest) {
	for (const route of routesToTest) {
		test(`locale ${locale} for route ${route} has no errors`, async ({ page }) => {
			await page.addInitScript((locale) => {
				localStorage.setItem('locale', locale);
			}, locale);
			page.on('console', (msg) => {
				if (msg.type() === 'error') {
					expect(msg.text()).not.toContain('[playwright:error:t]');
				}
			});
			await page.goto(route);
		});
	}
}
