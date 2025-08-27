// import { test, expect } from '../fixtures/withLace';
// import { restoreLace } from '../wallet/restoreLace';

// const SEED = process.env.LACE_SEED!;
// const PASSWORD = process.env.LACE_PASSWORD!;

// test('fresh run: restore Lace, open Minswap, connect & authorize', async ({ context, extensionSetupUrl, extensionId }) => {
//   // 1) Restore Lace into this temp profile
//   const ui = await context.newPage();
//   await restoreLace(ui, extensionSetupUrl, SEED, PASSWORD);

//   // 2) Open Minswap preprod
//   const page = await context.newPage();
//   await page.goto('https://testnet-preprod.minswap.org/swap', { waitUntil: 'domcontentloaded' });

//   // 3) Connect wallet
//   await page.getByTestId('btn-connect-wallet').click();

//   // 4) Pick Lace (scope to dialog to avoid duplicates)
//   const dialog = page.getByRole('dialog').first();
//   const lace = dialog.locator('div.cursor-pointer').filter({ has: page.getByAltText('Lace') }).first();
//   await expect(lace).toBeVisible();
//   await lace.click();

//   // 5) Approve the Lace popup
//   const popup = await context.waitForEvent('page', {
//     predicate: p => p.url().startsWith(`chrome-extension://${extensionId}/`),
//     timeout: 10000,
//   });
//   await popup.bringToFront();
//   // prefer test-id if available
//   const authorizeBtn = popup.getByTestId('connect-authorize-button')
//     .or(popup.getByRole('button', { name: /authorize|connect|approve/i }));
//   await authorizeBtn.click();

//   // 6) Assert connected (button hidden or address visible)
//   await expect(page.getByTestId('btn-connect-wallet')).toBeHidden({ timeout: 10000 });
// });
