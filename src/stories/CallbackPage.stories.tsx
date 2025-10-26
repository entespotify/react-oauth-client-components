import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { CallbackPage } from '../CallbackPage';

const callBack = () => {
	console.log("Callback ");
}

const errorCallBack = () => {
	throw new Error("Error flow test")
}

const meta = {
	title: 'CallbackPage',
	component: CallbackPage,
	parameters: {
		layout: 'fullscreen',
	}
} satisfies Meta<typeof CallbackPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
	args: {
		onSuccessCallback: callBack
	}
};

export const ErrorPage: Story = {
	args: {
		onSuccessCallback: errorCallBack
	}
};
