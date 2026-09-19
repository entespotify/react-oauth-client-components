import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { AuthService } from '../src/authService';

describe('authService.login()', () => {
  let capturedHref = '';
  let savedLocation: any;

  beforeEach(() => {
    capturedHref = '';
    savedLocation = (globalThis as any).location;
    // Replace window.location with a plain mock that captures href assignments.
    const mockLocation = {
      get href() { return capturedHref; },
      set href(v: string) { capturedHref = v; },
    };
    (globalThis as any).location = mockLocation;
  });

  afterEach(() => {
    (globalThis as any).location = savedLocation;
  });

  it('builds authorization URL with PKCE S256 and required params', async () => {
    const service = new AuthService({
      clientId: 'test-client',
      authorizationEndpoint: 'https://oauth.example.com/authorize',
      tokenEndpoint: 'https://oauth.example.com/token',
      redirectUri: 'https://app.local/callback',
      scope: 'read write',
    });

    await service.login();

    expect(capturedHref).toBeTruthy();
    const url = new URL(capturedHref);
    expect(url.origin + url.pathname).toBe('https://oauth.example.com/authorize');
    expect(url.searchParams.get('client_id')).toBe('test-client');
    expect(url.searchParams.get('response_type')).toBe('code');
    expect(url.searchParams.get('redirect_uri')).toBe('https://app.local/callback');
    expect(url.searchParams.get('scope')).toBe('read write');
    expect(url.searchParams.get('code_challenge_method')).toBe('S256');
    const challenge = url.searchParams.get('code_challenge');
    expect(challenge).toBeTruthy();
    expect(challenge!.length).toBeGreaterThan(0);
  });
});
