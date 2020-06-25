import React, { Fragment } from 'react';
import { storiesOf } from "@storybook/react";
import { withKnobs } from '@storybook/addon-knobs/react';
import InputDropDown from "./";

storiesOf('Inputs', module)
  .addDecorator(withKnobs)
  .add('Input Drop down', () => {
    return (
      <Fragment>
        <InputDropDown
          id={new Date()}
          label="Test"
          options={[
            { value: 0, label: 'test 1' },
            { value: 1, label: 'test 2' },
            { value: 2, label: 'test 3' },
          ]}
          value={{ value: 1, label: 'test 2' }}
          nullOptionLabel="[None]"
          defaultOptionClass="default"
        />
      </Fragment>
    );
  });