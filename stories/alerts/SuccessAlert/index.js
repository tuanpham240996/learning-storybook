import React, { Component, Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import DefaultAlert from '../Alert/index';

class SuccessAlert extends Component {
  static defaultProps = {
    type: 'success',
    header: 'Successful submit!',
    content: undefined
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Fragment>
        <DefaultAlert {...this.props} />
      </Fragment>
    );
  }

}

export { SuccessAlert };
