import React, { Component, Fragment } from 'react';
import DefaultAlert from '../Alert/index';

class DangerAlert extends Component {
  static defaultProps = {
    type: 'danger',
    header: 'You got an error!',
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

export { DangerAlert };
