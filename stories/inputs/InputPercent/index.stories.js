import React, { Fragment } from 'react';
import { storiesOf } from "@storybook/react";
import { withKnobs } from '@storybook/addon-knobs/react';
import InputPercentField from "./.";

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .add('Input Percent', () => {
    return (
      <Fragment>
        <InputPercentField
          value={15.12}
          label="Percent"
          prefix="Calculate"
          fractionDigits={3}
        />
      </Fragment>
    );
  });