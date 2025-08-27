import { Page, Locator } from '@playwright/test';

export class MinswapPage {
  readonly page: Page;
  readonly connectWalletButton: Locator;
  readonly laceOption: Locator;
  readonly authorizeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.connectWalletButton = page.locator('//button[@data-test="btn-connect-wallet"]');
    // temporary locoator to pick the correct Lace option
    this.laceOption = page.locator('(//div[contains(@class, "cursor-pointer") and .//img[@alt="Lace"]])[2]');
    this.authorizeButton = page.locator("//button[@data-testid='connect-authorize-button' and .//span[normalize-space(.)='Authorize']]");
  }

  async goto() {
    await this.page.goto('https://testnet-preprod.minswap.org/swap', { waitUntil: 'domcontentloaded' });
  }

  async clickConnectWallet() {
    await this.connectWalletButton.click();
  }

  async selectLace() {
    await this.laceOption.click();
  }

  // async authorizeLace() {
  //   await this.authorizeButton.click();
  // }
}
