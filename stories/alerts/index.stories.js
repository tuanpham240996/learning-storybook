import React from 'react';
import { storiesOf } from "@storybook/react";
import { DangerAlert } from "./DangerAlert";
import { InfoAlert } from "./InfoAlert";
import { SuccessAlert } from "./SuccessAlert";
import { WarningAlert } from "./WarningAlert";


storiesOf('Alert', module)
  .add('Danger Alert', () => {
    return <DangerAlert />;
  })
  .add('Information Alert', () => {
    return <InfoAlert />;
  })
  .add('Success Alert', () => {
    return <SuccessAlert  />;
  })
  .add('Warning Alert', () => {
    return <WarningAlert />;
  })
;