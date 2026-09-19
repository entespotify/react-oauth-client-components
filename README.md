react-oauth-client-components (TypeScript)
========================

**v2.0.0 — Logic-Only**  
This library is now stripped to core OAuth2 / PKCE logic (`AuthProvider`, `AuthService`, `useAuth`, `generatePKCE`, `types`). MUI components (`LoginPage`, `CallbackPage`) and Storybook artifacts have been removed; UI belongs to the consuming app.

## Overview
`@entespotify/react-oauth-client-components` is a React library that simplifies the implementation of OAuth2 authentication in your React applications. It provides components and utilities to handle login, token management, and PKCE (Proof Key for Code Exchange).

## Installation
Install the library using npm:

```bash
npm install @entespotify/react-oauth-client-components
```

You also need to have `react` as a peer dependency in your project:

```bash
npm install react
```

## Usage
### 1. Import Components
The library exports the following components and utilities:
- `AuthProvider`
- `AuthService`
- `useAuth`
- `generatePKCE`

### 2. Configure the `AuthProvider`
Wrap your application with the `AuthProvider` and provide the necessary configuration:

```tsx
import React from 'react';
import { AuthProvider } from '@entespotify/react-oauth-client-components';

const config = {
  clientId: 'your-client-id',
  authorizationEndpoint: 'https://example.com/oauth/authorize',
  tokenEndpoint: 'https://example.com/oauth/token',
  redirectUri: 'https://your-app.com/callback',
  scope: 'read write',
  storage: 'localStorage', // or 'sessionStorage'
};

function App() {
  return (
    <AuthProvider config={config}>
      <YourApp />
    </AuthProvider>
  );
}

export default App;
```

### 3. Access Authentication State
Use the `useAuth` hook to access authentication state and methods:

```tsx
import React from 'react';
import { useAuth } from '@entespotify/react-oauth-client-components';

function Dashboard() {
  const { token, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome!</h1>
      <p>Access Token: {token?.access_token}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default Dashboard;
```

## API Reference
### `AuthProvider`
- **Props**:
  - `config`: Configuration object with the following fields:
    - `clientId` (string, required): OAuth2 client ID.
    - `authorizationEndpoint` (string, required): URL for the authorization endpoint.
    - `tokenEndpoint` (string, required): URL for the token endpoint.
    - `redirectUri` (string, required): Redirect URI for your application.
    - `scope` (string, optional): OAuth2 scope.
    - `storage` (string, optional): Storage type (`localStorage` or `sessionStorage`).

### `LoginPage`
- **Props**:
  - `label` (string, optional): Label for the login page.
  - `children` (ReactNode, optional): Additional content to render.

### `CallbackPage`
- **Props**:
  - `onSuccessRedirect` (string, optional): URL to redirect to after successful login.

### `useAuth`
- **Returns**:
  - `token`: The current OAuth2 token.
  - `isAuthenticated`: Boolean indicating if the user is authenticated.
  - `login`: Function to initiate login.
  - `logout`: Function to log out.
  - `service`: Instance of `AuthService`.

## Development
To build the library, run:

```bash
npm run build
```

To clean the build artifacts:

```bash
npm run clean
```

## License
This project is licensed under the MIT License.

## Feedback
Since this is a beta version, your feedback is highly appreciated. Please report any issues or suggestions in the GitHub repository.
