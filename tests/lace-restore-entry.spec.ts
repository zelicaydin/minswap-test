import { test, expect } from '../fixtures/withLace';
import { LaceSetupPage } from '../wallet/LaceSetupPage';
import { MNEMONIC_24, mnemonicWords } from '../wallet/seed';

test('open Lace and click Restore (stop here)', async ({ context, extensionSetupUrl }) => {
  const ui = await context.newPage();
  const lace = new LaceSetupPage(ui, extensionSetupUrl);

  await lace.open();
  await lace.clickRestore();
  await lace.clickNext();

  // you’ll extend next:
  // await lace.fillMnemonic(mnemonicWords());
  // await lace.setPassword('...');
  // await lace.switchToPreprod();

  console.log('[mnemonic]', MNEMONIC_24);
  await ui.waitForTimeout(5000000);
});
