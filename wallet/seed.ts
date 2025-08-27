// PASTE your EXACT 24-word recovery phrase below.
// - all lowercase
// - single spaces between words
// - exactly 24 words
// - testnet-only (do NOT use a real mainnet wallet)
export const MNEMONIC_24 = `rib mixture phrase episode thrive baby vast erosion reveal stand tree fork gesture write nest swap find vast evidence immune indoor industry toilet pencil`;

// (optional) a password you'll set during restore — change this if/when you script that step
export const WALLET_PASSWORD = `change-me-strong-test-password`;

// Helper: split into an array of words (useful for filling multiple inputs later)
export function mnemonicWords(): string[] {
  const words = MNEMONIC_24.trim().split(/\s+/);
  if (words.length !== 24) {
    throw new Error(`MNEMONIC_24 must contain exactly 24 words (got ${words.length}).`);
  }
  return words;
}
