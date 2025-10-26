import type { Meta, StoryObj } from '@storybook/react-webpack5';

import { LoginPage } from '../LoginPage';

const meta = {
	title: 'LoginPage',
	component: LoginPage,
	parameters: {
		layout: 'fullscreen',
	}
} satisfies Meta<typeof LoginPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const DirectLogin: Story = {
  args: {
	directLogin: true
  },
};