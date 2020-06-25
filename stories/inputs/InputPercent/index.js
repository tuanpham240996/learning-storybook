import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import BigNumber from 'bignumber.js/bignumber';
import { InputGroup, FormControl } from 'react-bootstrap';

const BN = BigNumber.clone({ DECIMAL_PLACES: 2 });
const REGEX = /^(\d+|\d+\.\d*)$/;
class InputPercentField extends Component {
  static defaultProps ={
    className: undefined,
    suffix: '%',
    label: 'Percent',
    value: 0,
    fractionDigits: 2,
    disabledLabel: false,
    disabled: false,
    max: new BN(100).toFixed(2, BigNumber.ROUND_DOWN),
    min: new BN(0).toFixed(2, BigNumber.ROUND_DOWN),
    error: {},
  };

  constructor(props) {
    super(props);
    const max = new BN(props.max).toFixed(props.fractionDigits, BigNumber.ROUND_DOWN);
    const min = new BN(props.min).toFixed(props.fractionDigits, BigNumber.ROUND_DOWN);
    this.state = {
      value: this.formatNumber(props.value),
      max: max,
      mix: min,
      error: props.error,
      errorMessage: `Invalid value field!!! the value from ${min}% to ${max}%`,
    };
    this.default = this.props.value;
  }

  formatNumber(value) {
    const { fractionDigits } = this.props;
    if (REGEX.test(value)) {
      return new BN(Number(value)).toFixed(fractionDigits, BigNumber.ROUND_DOWN);
    }
    return value;
  }

  onChange(event) {
    const { value } = event.target;
    let numericValue = 0;
    if(REGEX.test(value) || isEmpty(value)) {
      numericValue = value;
    }
    this.setState({ value: numericValue });
  }

  onBlur(event) {
    const { max, min, label } = this.props;
    const { errorMessage } = this.state;
    const { value } = event.target;
    let error = {};
    if(Number(value) > Number(max) || Number(value) < Number(min)) {
      error = { fieldName: label, errorMessage };
    }
    this.setState({ value: this.formatNumber(value || 0), error });
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
    const { min, max } = this.props;
    const { value, error } = this.state;
    let styleBorder = ' solid';
    if (!isEmpty(error)) {
      styleBorder = styleBorder + ' crimson';
    } else if (Number(value) >= min && Number(value) <= max) {
      if (Number(value) === Number(this.default)) {
        styleBorder = styleBorder + ' #ced4da';
      } else styleBorder = styleBorder +  ' steelblue';
    } else {
      styleBorder = styleBorder + ' #ced4da';
    }
    return styleBorder;
  }

  render() {
    const {
      className,
      suffix,
      label,
      disabledLabel,
      disabled,
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
            style={{
              border: '1.5px' + styleBorder,
            }}
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

InputPercentField.propTypes = {
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
  // display digits after dot
  fractionDigits: PropTypes.number,
  // this field has error
  error: PropTypes.oneOfType(PropTypes.array, PropTypes.object),
  // check max value to get error
  max: PropTypes.number,
  // check min value to get error
  min: PropTypes.number,
  // read only
  readOnly: PropTypes.bool
};

export default InputPercentField;
