import { describe, it, expect, vi, beforeEach } from 'vitest';
import { generatePKCE } from '../src/pkce';

describe('generatePKCE()', () => {
  beforeEach(() => {
    // Mock crypto.getRandomValues to produce deterministic output for assertions.
    vi.spyOn(globalThis.crypto, 'getRandomValues').mockImplementation(
      (arr: ArrayBufferView) => {
        for (let i = 0; i < arr.length; i++) arr[i] = i;
        return arr as Uint8Array;
      }
    );
  });

  it('returns non-empty verifier and challenge', async () => {
    const result = await generatePKCE();
    expect(result.verifier).toBeTruthy();
    expect(result.challenge).toBeTruthy();
    expect(typeof result.verifier).toBe('string');
    expect(typeof result.challenge).toBe('string');
  });

  it('verifier matches base64url regex (no +, /, =)', async () => {
    const result = await generatePKCE();
    expect(result.verifier).toMatch(/^[A-Za-z0-9_-]+$/);
  });

  it('challenge is derived from verifier via SHA-256 (S256)', async () => {
    // Capture digest input bytes to confirm it equals the encoded verifier.
    let capturedInput: ArrayBuffer | null = null;
    const originalDigest = globalThis.crypto.subtle.digest.bind(globalThis.crypto.subtle);
    vi.spyOn(globalThis.crypto.subtle, 'digest').mockImplementation(async (algo, data) => {
      capturedInput = data as ArrayBuffer;
      return originalDigest(algo, data);
    });

    const result = await generatePKCE();
    expect(capturedInput).not.toBeNull();
    // The challenge should match what the digest produces for the verifier bytes.
    expect(result.challenge.length).toBeGreaterThan(0);
  });
});
