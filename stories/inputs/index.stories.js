import React, { Fragment } from 'react';
import { storiesOf } from "@storybook/react";
import { withKnobs } from '@storybook/addon-knobs/react';
import Input from "./";

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .add('Input', () => {
    return (
      <Fragment>
        <Input
          value={15.12}
          label="Percent"
          prefix="Calculate"
          placeholder="Input Percent Value"
        />
      </Fragment>
    );
  });