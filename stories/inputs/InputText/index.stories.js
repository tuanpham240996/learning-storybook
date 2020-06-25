import React, { Fragment } from 'react';
import { storiesOf } from "@storybook/react";
import { withKnobs } from '@storybook/addon-knobs/react';
import InputTextField from "./";

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .add('Input Text', () => {
    return (
      <Fragment>
        <InputTextField
          label="User"
          value="test"
          placeholder="Input the value..."
          maxLength={20}
        />
      </Fragment>
    );
  });