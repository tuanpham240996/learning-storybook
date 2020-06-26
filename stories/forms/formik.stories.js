import React   from 'react';
import { storiesOf } from "@storybook/react";
import { withKnobs } from '@storybook/addon-knobs/react';
import { InputGroup, Form, Col, Button } from 'react-bootstrap';
import { Formik } from 'formik';
import * as yup from 'yup'

const schema = yup.object({
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  username: yup.string().required(),
  city: yup.string().required(),
  state: yup.string().required(),
  zip: yup.string().required(),
  terms: yup.bool().required(),
});

function FormExample() {
  return (
    <Formik
      validationSchema={schema}
      validateOnChange={false}
      onSubmit={console.log}
      initialValues={{
        firstname: '',
        lastname: '',
        username: '',
        city: '',
        state: '',
        terms: undefined,
      }}
    >
      {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          isValid,
          errors,
          initialValues,
        }) => {
        console.log('values', values);
        console.log('initialValues:', initialValues);
        console.log('errors:', errors);
        console.log('isValid:', isValid);
        return (
          <Form noValidate onSubmit={handleSubmit}>
            <Form.Row>
              <Form.Group as={Col} md="3" controlId="validationFormik01">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  name="firstname"
                  value={values.firstName}
                  onChange={handleChange}
                  isValid={touched.firstname && !errors.firstname}
                  isInvalid={!!errors.firstname}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.firstname}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik02">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  name="lastname"
                  value={values.lastname}
                  onChange={handleChange}
                  isValid={touched.lastname && !errors.lastname}
                  isInvalid={!!errors.lastname}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.lastname}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormikUsername">
                <Form.Label>Username</Form.Label>
                <InputGroup>
                  <InputGroup.Prepend>
                    <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                  </InputGroup.Prepend>
                  <Form.Control
                    type="text"
                    placeholder="Username"
                    aria-describedby="inputGroupPrepend"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                    isValid={touched.username && !errors.username}
                    isInvalid={!!errors.username}
                  />
                  <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} md="3" controlId="validationFormik03">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="City"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  isValid={touched.city && !errors.city}
                  isInvalid={!!errors.city}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.city}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik04">
                <Form.Label>State</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="State"
                  name="state"
                  value={values.state}
                  onChange={handleChange}
                  isValid={touched.state && !errors.state}
                  isInvalid={!!errors.state}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.state}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="3" controlId="validationFormik05">
                <Form.Label>Zip</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Zip"
                  name="zip"
                  value={values.zip}
                  onChange={handleChange}
                  isValid={touched.zip && !errors.state}
                  isInvalid={!!errors.zip}
                />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">
                  {errors.zip}
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Group>
              <Form.Check>
                <Form.Check.Input
                  required
                  name="terms"
                  value={values.terms}
                  onChange={handleChange}
                />
                <Form.Check.Label>Agree to terms and conditions</Form.Check.Label>
              </Form.Check>
            </Form.Group>
            <Button type="submit">Submit form</Button>
          </Form>
        );
      }}
    </Formik>
  );
}

storiesOf('Forms', module)
  .addDecorator(withKnobs)
  .add('Form: Formik validation', () => {
    return (
      <FormExample />
    );
  });
