import { Page, expect } from '@playwright/test';

// Opens Lace setup and clicks ONLY the "Restore" action. Nothing else.
export async function openLaceSetupAndClickRestore(ui: Page, setupUrl: string) {
  await ui.goto(setupUrl, { waitUntil: 'domcontentloaded' });
  await expect(ui).toHaveURL(/app\.html#\/setup/);

  const restoreBtn = ui.getByRole('button', {
    name: /restore|import|already have|i already/i,
  }).first();

  await restoreBtn.waitFor({ state: 'visible', timeout: 15000 });
  await restoreBtn.click();

}