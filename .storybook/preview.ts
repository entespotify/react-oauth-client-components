import type { Preview } from '@storybook/react-webpack5'
import { withAuthContext } from './context';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withAuthContext
  ]
};

export default preview;