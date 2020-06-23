import React, { Component, Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import DefaultAlert from '../Alert/index';

class WarningAlert extends Component {
  static defaultProps = {
    type: 'warning',
    header: 'Warning!',
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

export { WarningAlert };
