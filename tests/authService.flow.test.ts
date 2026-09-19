import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import fetchMock from 'fetch-mock';
import { AuthService } from '../src/authService';

describe('authService two-leg OAuth PKCE flow (v2.0.0)', () => {
  const base = 'https://test-oauth.local';

  beforeEach(() => {
    // Mock authorization endpoint (redirect) and token endpoint.
    fetchMock.get(`${base}/authorize`, (url) => {
      // Confirm the URL contains PKCE S256 params before redirect.
      expect(url).toContain('code_challenge_method=S256');
      expect(url).toContain('response_type=code');
      return { redirectUrl: `${base}/callback?code=AUTHCODE123` };
    }, { sendAsJson: false });

    fetchMock.post(`${base}/token`, () => ({
      access_token: 'test-access-token',
      token_type: 'Bearer',
      expires_in: 3600,
    }), { sendAsJson: false });
  });

  afterEach(() => {
    fetchMock.restore();
  });

  it('produces correct authorization redirect with PKCE', async () => {
    const service = new AuthService({
      clientId: 'test-id',
      authorizationEndpoint: `${base}/authorize`,
      tokenEndpoint: `${base}/token`,
      redirectUri: `${base}/callback`,
      scope: 'read',
    });

    await service.login();
    // In jsdom the redirect is captured; here we confirm build via mock endpoint.
    expect(fetchMock.called()).toBe(true);
    const [url] = fetchMock.calls();
    expect(url[0]).toContain('client_id=test-id');
    expect(url[0]).toContain('code_challenge_method=S256');
  });
});
