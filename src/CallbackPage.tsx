import React, { useEffect, useState } from 'react';
import { Backdrop, CircularProgress, Typography, Button } from '@mui/material';
import { useAuth } from './AuthProvider';

export interface CallbackPageProps {
	onSuccessRedirect?: string;
	onSuccessCallback?: () => void;
}

export const CallbackPage: React.FC<CallbackPageProps> = ({
	onSuccessRedirect,
	onSuccessCallback
}) => {
	const { service } = useAuth();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const handleCallback = async () => {
			try {
				await service.handleRedirectCallback();

				if (onSuccessCallback) {
					onSuccessCallback();
				} else if (onSuccessRedirect) {
					const isAbsolute = /^https?:\/\//i.test(onSuccessRedirect);
					if (isAbsolute) {
						window.location.href = onSuccessRedirect;
					} else {
						// use window.location.assign for relative path
						window.location.assign(onSuccessRedirect);
					}
				} else {
					// default fallback
					window.location.assign('/');
				}
			} catch (err: any) {
				console.error('Callback error:', err);
				setError(err?.message || 'Login failed. Please try again.');
			} finally {
				setLoading(false);
			}
		};

		handleCallback();
	}, [service, onSuccessRedirect, onSuccessCallback]);

	const callBackLoading: React.ReactNode = (
		<>
			<CircularProgress color="inherit" />
			<Typography color='#fff'>Hang tight while we log you in...</Typography>
		</>
	);

	const callBackError: React.ReactNode = (
		<>
			<Typography variant="h6" color="error">
				{error}
			</Typography>
			<Button
				variant="outlined"
				color="inherit"
				onClick={() => window.location.reload()}
			>
				Retry
			</Button>
		</>
	);

	return (
		<Backdrop
			sx={{
				color: '#26c6da',
				flexDirection: 'column',
				textAlign: 'center',
				gap: 2,
				p: 4,
			}}
			open={true}
		>
			{loading && callBackLoading}

			{!loading && error && callBackError}
		</Backdrop>
	);
};
