import React, { Fragment } from 'react';
import { storiesOf } from "@storybook/react";
import { withKnobs } from '@storybook/addon-knobs/react';
import InputDate from "./";

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .add('Input Date', () => {
    return (
      <Fragment>
        <InputDate
          id={new Date()}
          label="Test"
          //format date YYYY-MM-DD
          value="2200-06-25"
        />
      </Fragment>
    );
  });