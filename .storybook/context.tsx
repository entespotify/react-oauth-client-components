import type { Decorator } from '@storybook/react'
import { AuthProvider } from "../src/AuthProvider"

const authConfig = {
	clientId: "",
	authorizationEndpoint: "/o/authorize/",
	tokenEndpoint: "/o/token/",
	redirectUri: "",
	scope: "read",
	storage: "localStorage" as const,
};

export const withAuthContext: Decorator = (Story) => {
	return (
		<AuthProvider config={authConfig}>
			<Story />
		</AuthProvider>
	);
};