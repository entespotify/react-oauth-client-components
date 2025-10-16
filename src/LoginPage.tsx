import React from 'react';
import { useAuth } from './AuthProvider';

export const LoginPage: React.FC<{ label?: string; children?: React.ReactNode }> = ({ label, children }) => {
  const { login } = useAuth();
  return (
    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', height:'100vh' }}>
      <h1>{label || 'Sign in'}</h1>
      <button onClick={() => login()} style={{ padding: '8px 12px', marginTop: 12 }}>Continue with SSO</button>
      {children}
    </div>
  );
};
