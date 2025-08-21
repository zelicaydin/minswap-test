import { test, expect } from './fixtures/withLace';

test('Lace is loaded', async ({ context, extensionId }) => {
  expect(extensionId).toBeTruthy();
  const page = await context.newPage();
  await page.goto('chrome://extensions');
  await page.waitForTimeout(10000);
});
