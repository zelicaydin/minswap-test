import { Page, Locator } from '@playwright/test';

export class LacePopupPage {
  readonly page: Page;
  readonly authorizeButton: Locator;
  readonly passwordField: Locator;
  readonly unlockButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.authorizeButton = page.locator('//button[@data-testid="connect-authorize-button"]');
    this.passwordField = page.getByPlaceholder(/password/i);
    this.unlockButton = page.getByRole('button', { name: /unlock/i });
  }

  async ensureVisible() {
    await this.page.setViewportSize({ width: 1000, height: 800 });
  }

  async unlockIfNeeded(password: string) {
    if (await this.passwordField.isVisible().catch(() => false)) {
      await this.passwordField.fill(password);
      await this.unlockButton.click();
    }
  }

  async authorize() {
    await this.authorizeButton.waitFor({ state: 'visible', timeout: 15000 });
    await this.authorizeButton.click();
  }
}
