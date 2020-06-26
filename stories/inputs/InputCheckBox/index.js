import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';
import { InputGroup } from 'react-bootstrap';
import { Radio, RadioGroup } from 'react-radio-group'

class InputCheckBox extends Component {
  static defaultProps = {
    className: undefined,
    label: undefined,
    value: '',
    disabledLabel: false,
    disabled: false,
    error: {},
    options: [
      { value: true, label: 'Yes', checked: false },
      { value: false, label: 'No', checked: false },
    ],
  };

  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
      error: props.error,
      errorMessage: `Invalid value field!!!`,
      options: props.options,
    };
    this.default = this.props.value;
  }

  onChange(value) {
    const { options } = this.state;
    if (!isEmpty(options)) {
      options.find(item => {
        item.checked = item.value === value;
      });
    }
    this.setState({ options });
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
    const { options } = this.state;
    let styleBorder = this.getBorderStyle();
    return (
      <Fragment>
        <InputGroup className={className}>
          {label && !disabledLabel && (
            <InputGroup.Prepend>
              <InputGroup.Text style={{
                border: '1.15px' + styleBorder,
                width: '60px',
              }}>{label}</InputGroup.Text>
            </InputGroup.Prepend>
          )}
          <RadioGroup name="fruits" style={{ paddingLeft: '15px' }} onChange={(e) => this.onChange(e)} >
            {options.map((radio) => (
              <div className="radio-button-background">
                <Radio
                  disabled={disabled || readOnly}
                  value={radio.value}
                  className="radio-button"
                  style={{ marginRight: '10px' }}
                  checked={radio.checked}
                />
                {radio.label}
              </div>
            ))}
          </RadioGroup>
        </InputGroup>
      </Fragment>
    );
  }
}

InputCheckBox.propTypes = {
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

export default InputCheckBox;
