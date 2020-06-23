import React from 'react';
import { Button } from 'react-bootstrap';

const DefaultButton = (props) => {
  const { children, ...otherProps } = props;
  return (
    <Button {...otherProps} variant="secondary">
      {children}
    </Button>
  );
};

export default DefaultButton;
