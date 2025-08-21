import { test as base, chromium, type BrowserContext } from '@playwright/test';
import path from 'path';

export const test = base.extend<{ context: BrowserContext; extensionId: string }>({
  context: async ({}, use) => {
    const extPath = path.resolve('tools/lace-extension'); // copied lace folder
    const userDataDir = path.resolve('.pw-user-data/lace-preprod');

    const context = await chromium.launchPersistentContext(userDataDir, {
      headless: false,
      args: [
        `--disable-extensions-except=${extPath}`,
        `--load-extension=${extPath}`,
      ],
    });

    await use(context);
    await context.close();
  },

  extensionId: async ({ context }, use) => {
    let [sw] = context.serviceWorkers();
    if (!sw) sw = await context.waitForEvent('serviceworker');
    const id = sw.url().split('/')[2];
    await use(id);
  },
});

export const expect = base.expect;
