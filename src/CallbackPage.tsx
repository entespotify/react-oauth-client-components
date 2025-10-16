import React, { useEffect } from 'react';
import { useAuth } from './AuthProvider';

export const CallbackPage: React.FC<{ onSuccessRedirect?: string }> = ({ onSuccessRedirect }) => {
  const { service } = useAuth();

  useEffect(() => {
    service.handleRedirectCallback().then(() => {
      window.location.href = onSuccessRedirect || '/';
    }).catch((err) => {
      console.error('Callback error', err);
    });
  }, [service, onSuccessRedirect]);

  return <div style={{ padding: 20 }}>Signing you in...</div>;
};
