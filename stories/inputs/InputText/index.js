import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { InputGroup, FormControl, FormText } from 'react-bootstrap';

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
    required: false,
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
    const { onChange } = this.props;
    if (onChange) {
      onChange({ target: event.target});
    } else {
      const { value } = event.target;
      this.setState({ value: value });
    }
  }

  onBlur(event) {
    const { label, required } = this.props;
    const { errorMessage } = this.state;
    const { value } = event.target;
    let error = {};
    if(REGEX.test(value)) {
      error = { fieldName: label, errorMessage };
    }
    if (isEmpty(value) && required) {
      error = { fieldName: label, errorMessage: `Please provide a valid ${label}.` };
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
      required,
      fieldName,
      ...otherProps
    } = this.props;
    const { value, error } = this.state;
    const displayValue = value;
    return (
      <Fragment>
        <InputGroup className={className}>
          {label && !disabledLabel && (
            <InputGroup.Prepend>
              <InputGroup.Text>{label}</InputGroup.Text>
            </InputGroup.Prepend>
          )}
          <FormControl
            {...otherProps}
            name={fieldName}
            required={required}
            value={displayValue}
            disabled={disabled || readOnly}
            onChange={(event) => this.onChange(event)}
            onBlur={(event) => this.onBlur(event)}
            placeholder={placeholder}
            maxLength={maxLength}
          />
          {suffix && (
            <InputGroup.Prepend>
              <InputGroup.Text>{suffix}</InputGroup.Text>
            </InputGroup.Prepend>
          )}
          {!isEmpty(error) ? (
            <FormText style={{
              color: '#dc3545',
              fontWeight: 400,
              inlineSize: 'inherit',
            }}>
              {`${error.fieldName}: ${error.errorMessage}`}
            </FormText>
          ) : (
            <FormControl.Feedback>Looks good!</FormControl.Feedback>
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
  readOnly: PropTypes.bool,
  required: PropTypes.bool,
};

export default InputTextField;
