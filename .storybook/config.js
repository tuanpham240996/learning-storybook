import { addParameters, configure } from '@storybook/react';
import { create } from '@storybook/theming';

addParameters({
  options: {
    theme: create({
      base: 'light',
      brandTitle: 'Composer GEL Component',
    }),
    isFullscreen: false,
    panelPosition: 'right',
    isToolshown: true,
    hierarchySeparator: /\/|\./,
    hierarchyRootSeparator: /\|/,
  },
});

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
