import React, { Fragment } from 'react';
import { storiesOf } from "@storybook/react";
import DefaultButton from "../buttons/DefaultButton";
import InfoButton from "../buttons/InfoButton";
import PrimaryButton from "../buttons/PrimaryButton";

storiesOf('Buttons', module)
  .add('Button', () => {
    return (
      <Fragment>
        <DefaultButton>Default Button</DefaultButton>{' '}
        <InfoButton>Information Button</InfoButton>{' '}
        <PrimaryButton>Primary Button</PrimaryButton>
      </Fragment>
    );
  });