import React from 'react';
import { Button } from 'react-bootstrap';

const PrimaryButton = (props) => {
  const { children, ...otherProps } = props;
  return (
    <Button {...otherProps} variant="primary">
      {children}
    </Button>
  );
};

export default PrimaryButton;
