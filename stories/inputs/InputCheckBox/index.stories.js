import React, { Fragment } from 'react';
import { storiesOf } from "@storybook/react";
import { withKnobs } from '@storybook/addon-knobs/react';
import InputCheckBox from "./";

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .add('Input Check Box', () => {
    return (
      <Fragment>
        <InputCheckBox
          label="Test"
          options={[
            { value: true, label: 'Yes', checked: false },
            { value: false, label: 'No', checked: true },
          ]}
        />
      </Fragment>
    );
  });