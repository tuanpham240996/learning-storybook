import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { InputGroup } from 'react-bootstrap';

class InputDropDown extends Component {
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
    } else if (value === this.default || value === String(this.default.value)) {
      styleBorder = styleBorder + ' #ced4da';
    } else styleBorder = styleBorder +  ' steelblue';
    return styleBorder;
  }

  render() {
    const {
      id,
      className,
      label,
      disabledLabel,
      disabled,
      nullOptionDisabled,
      options,
      defaultOptionClass,
      nullOptionLabel,
      readOnly,
    } = this.props;
    const { value: { value } } = this.state;
    const displayValue = value;
    let styleBorder = this.getBorderStyle();
    const nullOption = nullOptionDisabled ? undefined : <option value="" key="null-option">{nullOptionLabel}</option>;
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
          <select
            id={id}
            value={displayValue}
            onChange={(e) => {
              this.onChange(e);
            }}
            className="form-control"
            disabled={disabled || readOnly}
            style={{
              border: '1.5px' + styleBorder,
            }}
          >
            {nullOption}
            {options.map((o, index) => {
              let { label } = o;
              let optionClass = '';
              if (o && String(o.value) === String(this.default.value)) {
                label = `${o.label} (default)`;
                optionClass = defaultOptionClass;
              }
              return (
                <option value={o.value} key={index} className={optionClass}>
                  {label}
                </option>
              );
            })}
          </select>
        </InputGroup>
      </Fragment>
    );
  }
}

InputDropDown.propTypes = {
  /** DOM children */
  id: PropTypes.any,
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
  // not display null option
  nullOptionDisabled: PropTypes.bool,
  // label for null option
  nullOptionLabel: PropTypes.string,
  // list for selected item.
  options: PropTypes.array.isRequired,
  // default option flag
  defaultOptionClass: PropTypes.string,
  // read only
  readOnly: PropTypes.bool
};

export default InputDropDown;
