import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { InputGroup, FormControl } from 'react-bootstrap';

const REGEX = /[!@#$%^&*(),.?":{}|<>+-/]/;
class InputTextField extends Component {
  static defaultProps ={
    className: undefined,
    suffix: undefined,
    label: undefined,
    value: '',
    disabledLabel: false,
    disabled: false,
    error: {},
    maxLength: 40,
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
    this.setState({ value: value });
  }

  onBlur(event) {
    const { label } = this.props;
    const { errorMessage } = this.state;
    const { value } = event.target;
    let error = {};
    if(REGEX.test(value)) {
      error = { fieldName: label, errorMessage };
    }
    this.setState({ value: value, error });
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
      suffix,
      label,
      disabledLabel,
      disabled,
      placeholder,
      maxLength,
      readOnly,
      ...otherProps
    } = this.props;
    const { value, error } = this.state;
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
            {...otherProps}
            value={displayValue}
            disabled={disabled || readOnly}
            onChange={(event) => this.onChange(event)}
            onBlur={(event) => this.onBlur(event)}
            placeholder={placeholder}
            style={{
              border: '1.5px' + styleBorder,
            }}
            maxLength={maxLength}
          />
          {suffix && (
            <InputGroup.Prepend>
              <InputGroup.Text style={{
                border: '1.15px' + styleBorder,
              }}>{suffix}</InputGroup.Text>
            </InputGroup.Prepend>
          )}
          {!isEmpty(error) && (
            <p style={{
              color: 'crimson',
              fontWeight: 400,
              inlineSize: 'inherit',
              marginLeft: '20px',
            }}>
              {`${error.fieldName}: ${error.errorMessage}`}
            </p>
          )}
        </InputGroup>
      </Fragment>
    );
  }
}

InputTextField.propTypes = {
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
  // display place holder
  placeholder: PropTypes.string,
  // max characters can input
  maxLength: PropTypes.number,
  // read only
  readOnly: PropTypes.bool
};

export default InputTextField;
