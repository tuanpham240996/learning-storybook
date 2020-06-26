import React,{ useState }  from 'react';
import { storiesOf } from "@storybook/react";
import { withKnobs } from '@storybook/addon-knobs/react';
import { InputGroup, Form, Col, Button } from 'react-bootstrap';
import InputTextField from "../inputs/InputText";

function FormExample() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Form.Row>
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <InputTextField
            required={true}
            label="First name"
            value="Mark"
            placeholder="First name"
            maxLength={20}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <InputTextField
            required={true}
            label="Last name"
            value="Otto"
            placeholder="Last name"
            maxLength={20}
          />
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <InputTextField
            required={true}
            label="User Name"
            fieldName="userName"
            value=""
            placeholder="User Name"
            maxLength={20}
            suffix="@"
          />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Form.Row>
      <Form.Group>
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
  );
}

storiesOf('Forms', module)
  .addDecorator(withKnobs)
  .add('Form: Native HTML5 form validation', () => {
    return (
      <FormExample />
    );
  });