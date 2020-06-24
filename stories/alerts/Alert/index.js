import React from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Alert, Container, Row, Col } from 'react-bootstrap'

const DefaultAlert = props => {
  const { type, header, content } = props;
  return (
    <Container fluid>
      <Row>
        <Col sm={4}>
          <Alert variant={type}>
            <Alert.Heading>{header}</Alert.Heading>
            <hr />
            <p className="mb-0">
              {content}
            </p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

DefaultAlert.propTypes = {
  /** DOM children */
  type: PropTypes.string,
  header: PropTypes.string,
  content: PropTypes.string,
};

export default DefaultAlert;
