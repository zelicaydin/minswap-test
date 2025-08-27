import { Page, Locator, expect } from '@playwright/test';

export class LaceSetupPage {
  readonly page: Page;
  readonly setupUrl: string;

  readonly restoreWalletButton: Locator;
  readonly nextButton: Locator;

  constructor(page: Page, setupUrl: string) {
    this.page = page;
    this.setupUrl = setupUrl;
    this.restoreWalletButton = page.getByTestId('restore-wallet-button');
    this.nextButton = page.getByTestId('wallet-setup-step-btn-next');
  }

  async open() {
    await this.page.goto(this.setupUrl, { waitUntil: 'domcontentloaded' });
    await expect(this.page).toHaveURL(/app\.html#\/setup/);
  }

  async clickRestore() {
    await this.restoreWalletButton.waitFor({ state: 'visible', timeout: 15_000 });
    await this.restoreWalletButton.click();
  }

  async clickNext() {
    await this.nextButton.click();
  }

  // ---- stubs for the next steps you’ll add (keep in this class) ----
  // async fillMnemonic(words: string[]) { /* your selectors here */ }
  // async setPassword(password: string) { /* your selectors here */ }
  // async switchToPreprod() { /* your selectors here */ }
}
