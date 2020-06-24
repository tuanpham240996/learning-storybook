import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import BigNumber from 'bignumber.js/bignumber';
import { InputGroup, FormControl } from 'react-bootstrap';

const BN = BigNumber.clone({ DECIMAL_PLACES: 2 });
const REGEX = /^(\d+|\d+\.\d*)$/;
class InputField extends Component {
  static defaultProps ={
    className: undefined,
    suffix: '%',
    label: 'Percent',
    value: 0,
    fractionDigits: 2,
    disabledLabel: true,
    max: 100,
    min: 0,
    error: {},
    errorMessage: 'Invalid value!!! the value from 0.00% to 100.00%',
  };

  constructor(props) {
    super(props);
    this.state = {
      value: this.formatNumber(props.value),
      max: props.max,
      mix: props.mix,
      error: props.error,
      errorMessage: props.errorMessage
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

  onchange(event) {
    const { value } = event.target;
    const { max, min, label, errorMessage } = this.props;
    let error = {};
    let numericValue = 0;

    if(REGEX.test(value) || isEmpty(value)) {
      numericValue = value;
      if(Number(numericValue) > Number(max) || Number(numericValue) < Number(min)) {
        error = { fieldName: label, errorMessage };
      }
    }
    this.setState({ value: numericValue, error });
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
      placeholder,
      label,
      disabledLabel,
      fractionDigits,
      ...otherProps
    } = this.props;
    const { value, error } = this.state;
    const displayValue = value;
    let styleBorder = ' solid';
    if (displayValue !== new BN(0).toFixed(fractionDigits)) {
      styleBorder = styleBorder +  (!isEmpty(error) ? ' crimson' : ' steelblue');
    } else {
      styleBorder = styleBorder + ' #ced4da';
    }
    return (
      <Fragment>
        <InputGroup className={className}>
          {label && disabledLabel && (
            <InputGroup.Prepend>
              <InputGroup.Text style={{
                border: '1px' + styleBorder,
              }}>{label}</InputGroup.Text>
            </InputGroup.Prepend>
          )}
          <FormControl
            {...otherProps}
            value={displayValue}
            onChange={(event) => this.onchange(event)}
            onBlur={(event) => {
              const { value } = event.target;
              this.setState({ value: this.formatNumber(value || 0) });
            }}
            placeholder={placeholder}
            aria-label={placeholder}
            style={{
              border: '2px' + styleBorder,
            }}
          />
          {suffix && (
            <InputGroup.Prepend>
              <InputGroup.Text style={{
                border: '1px' + styleBorder,
              }}>{suffix}</InputGroup.Text>
            </InputGroup.Prepend>
          )}
          {!isEmpty(error) && (
            <p style={{
              color: 'crimson',
              fontWeight: 200,
              inlineSize: 'inherit',
              marginLeft: '5%',
            }}>
              {`${error.fieldName}: ${error.errorMessage}`}
            </p>
          )}
        </InputGroup>
      </Fragment>
    );
  }
}

InputField.propTypes = {
  /** DOM children */
  className: PropTypes.string,
  prefix: PropTypes.string,
  suffix: PropTypes.string,
  value: PropTypes.number,
};

export default InputField;
