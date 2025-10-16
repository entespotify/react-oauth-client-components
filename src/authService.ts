import { AuthConfig, TokenResponse } from './types';
import { generatePKCE } from './pkce';

const PKCE_VERIFIER_KEY = '__auth_pkce_verifier';
const TOKEN_KEY = '__auth_token';

export class AuthService {
  private config: AuthConfig;

  constructor(config: AuthConfig) {
    this.config = config;
  }

  async login(state?: string) {
    const { verifier, challenge } = await generatePKCE();
    sessionStorage.setItem(PKCE_VERIFIER_KEY, verifier);

    const params = new URLSearchParams({
      client_id: this.config.clientId,
      response_type: 'code',
      redirect_uri: this.config.redirectUri,
      scope: this.config.scope || 'read',
      code_challenge: challenge,
      code_challenge_method: 'S256',
    });

    if (state) params.set('state', state);

    window.location.href = `${this.config.authorizationEndpoint}?${params.toString()}`;
  }

  async handleRedirectCallback(): Promise<{ data: TokenResponse; state?: string } | null> {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    if (!code) return null;

    const verifier = sessionStorage.getItem(PKCE_VERIFIER_KEY);
    if (!verifier) throw new Error('Missing PKCE verifier');

    const body = new URLSearchParams({
      grant_type: 'authorization_code',
      code,
      redirect_uri: this.config.redirectUri,
      client_id: this.config.clientId,
      code_verifier: verifier,
    });

    const res = await fetch(this.config.tokenEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    if (!res.ok) {
      const txt = await res.text();
      throw new Error('Token exchange failed: ' + txt);
    }

    const data = (await res.json()) as TokenResponse;
    const storage = this.config.storage === 'sessionStorage' ? sessionStorage : localStorage;
    storage.setItem(TOKEN_KEY, JSON.stringify(data));

    // clean url
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, '', url.toString());

    return { data, state: state || undefined };
  }

  getToken(): TokenResponse | null {
    const storage = this.config.storage === 'sessionStorage' ? sessionStorage : localStorage;
    const raw = storage.getItem(TOKEN_KEY);
    return raw ? JSON.parse(raw) as TokenResponse : null;
  }

  async refreshTokenIfNeeded(): Promise<TokenResponse | null> {
    const token = this.getToken();
    if (!token || !token.refresh_token) return null;

    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: token.refresh_token,
      client_id: this.config.clientId,
    });

    const res = await fetch(this.config.tokenEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: body.toString(),
    });

    if (!res.ok) return null;
    const data = (await res.json()) as TokenResponse;
    const storage = this.config.storage === 'sessionStorage' ? sessionStorage : localStorage;
    storage.setItem(TOKEN_KEY, JSON.stringify(data));
    return data;
  }

  logout() {
    const storage = this.config.storage === 'sessionStorage' ? sessionStorage : localStorage;
    storage.removeItem(TOKEN_KEY);
  }
}
