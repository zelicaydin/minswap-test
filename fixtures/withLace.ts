import { test as base, chromium, type BrowserContext } from '@playwright/test';
import path from 'path';
import fs from 'fs';
import os from 'os';

export const test = base.extend<{
  context: BrowserContext;
  extensionId: string;
  extensionSetupUrl: string;
}>({
  context: async ({}, use) => {
    // path to your unpacked Lace folder (must contain manifest.json directly)
    const extPath = path.resolve('tools/lace-extension');
    const manifest = path.join(extPath, 'manifest.json');
    if (!fs.existsSync(manifest)) throw new Error(`Missing manifest at: ${manifest}`);

    // create a throwaway Chrome profile under OS temp (NOT .pw-user-data)
    const tmpProfile = fs.mkdtempSync(path.join(os.tmpdir(), 'pw-lace-'));

    const context = await chromium.launchPersistentContext(tmpProfile, {
      headless: false,
      args: [
        `--disable-extensions-except=${extPath}`,
        `--load-extension=${extPath}`,
      ],
    });

    try {
      await use(context);
    } finally {
      await context.close();
      fs.rmSync(tmpProfile, { recursive: true, force: true }); // clean up
    }
  },

  extensionId: async ({ context }, use) => {
    // MV3: service worker url is chrome-extension://<ID>/...
    let [sw] = context.serviceWorkers();
    if (!sw) sw = await context.waitForEvent('serviceworker');
    const id = sw.url().split('/')[2];
    await use(id);
  },

  extensionSetupUrl: async ({ extensionId }, use) => {
    // you confirmed Lace setup lives here:
    await use(`chrome-extension://${extensionId}/app.html#/setup`);
  },
});

export const expect = base.expect;
