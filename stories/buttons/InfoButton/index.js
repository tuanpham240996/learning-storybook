import React from 'react';
import { Button } from 'react-bootstrap';

const InfoButton = (props) => {
  const { children, ...otherProps } = props;
  return (
    <Button {...otherProps} variant="info">
      {children}
    </Button>
  );
};

export default InfoButton;
