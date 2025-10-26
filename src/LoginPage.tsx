import React, { useEffect } from 'react';
import { useAuth } from './AuthProvider';
import { Backdrop, Button, CircularProgress, Typography } from '@mui/material';

export interface LoginPageProps { 
	label?: string,
	children?: React.ReactNode,
	directLogin?: boolean
}

const directLoginMarkup: React.ReactNode = (
	<>
		<CircularProgress color="inherit" />
		<Typography>Looking you up in our books.</Typography>
	</>
);

const promptLoginMarkup = (login: () => void, label?: string, children?: React.ReactNode) => {
	return (
		<>
			<Typography color='#fff'>{label || 'Sign in'}</Typography>
			<Button variant='outlined' color='inherit' onClick={() => login()}>Continue with SSO</Button>
			{children}
		</>
	)
}

export const LoginPage: React.FC<LoginPageProps> = ({ label, children, directLogin }) => {
	const { login } = useAuth();

	useEffect(() => {
		directLogin && login();
	}, [login, directLogin]);

	return (
		<>
			<Backdrop
				sx={{ color: '#26c6da', flexDirection: "column" }}
				open={true}
			>
				{directLogin ? directLoginMarkup : promptLoginMarkup(login, label, children)}
			</Backdrop>
		</>
	);
};
