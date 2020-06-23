import React, { Component, Fragment } from 'react';
import { storiesOf } from '@storybook/react';
import DefaultAlert from '../Alert/index';

class InfoAlert extends Component {
  static defaultProps = {
    type: 'info',
    header: 'Information!',
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

export { InfoAlert };

