import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { FormControl, InputGroup} from 'react-bootstrap';

class InputDropDown extends Component {
  static defaultProps ={
    className: undefined,
    label: undefined,
    value: '',
    disabledLabel: false,
    disabled: false,
    error: {},
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      error: props.error,
      errorMessage: `Invalid value field!!!`,
    };
    this.default = this.props.value;
  }

  onChange(event) {
    const { value } = event.target;
    this.setState({ value });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      const { onChange } = this.props;
      if (onChange) {
        onChange({ target: this.props.value});
      }
    }
  }

  getBorderStyle() {
    const { value, error } = this.state;
    let styleBorder = ' solid';
    if (!isEmpty(error)) {
      styleBorder = styleBorder + ' crimson';
    } else if (value === this.default) {
      styleBorder = styleBorder + ' #ced4da';
    } else styleBorder = styleBorder +  ' steelblue';
    return styleBorder;
  }


  render() {
    const {
      className,
      label,
      disabledLabel,
      disabled,
      readOnly,
    } = this.props;
    const { value } = this.state;
    const displayValue = value;
    let styleBorder = this.getBorderStyle();
    return (
      <Fragment>
        <InputGroup className={className}>
          {label && !disabledLabel && (
            <InputGroup.Prepend>
              <InputGroup.Text style={{
                border: '1.15px' + styleBorder,
              }}>{label}</InputGroup.Text>
            </InputGroup.Prepend>
          )}
          <FormControl
            value={displayValue}
            disabled={disabled || readOnly}
            onChange={(event) => this.onChange(event)}
            style={{
              border: '1.5px' + styleBorder,
            }}
            type="date"
          />
        </InputGroup>
      </Fragment>
    );
  }
}

InputDropDown.propTypes = {
  /** DOM children */
  className: PropTypes.string,
  // the label display on the left field
  label: PropTypes.string.isRequired,
  // not display label
  disabledLabel: PropTypes.bool,
  // disabled the field
  disabled: PropTypes.bool,
  // display on the right field
  suffix: PropTypes.string,
  // the percent value
  value: PropTypes.number,
  // this field has error
  error: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
  // read only
  readOnly: PropTypes.bool
};

export default InputDropDown;
