import React, { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/redux-hooks';
import { register } from '../../services/user-services';
import styles from './register-page.module.css';

export function RegisterPage() {
  const navigate = useNavigate();

  const user = useAppSelector(state => state.user.user);
  if (user) {
    navigate('/');
  }
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const realAge = Number(age);
    if (realAge < 1) {
      setError('Please re-check all the fields!');
      return;
    }
    const answer = await register(email, password, name, Number(age));
    if (!answer) {
      setError('Please re-check all the fields!');
      return;
    }
    navigate('/login');
  };

  return (
    <div className={styles.centered}>
      <ErrorMessage errorMessage={error} />
      <Form className="w-25" onSubmit={e => onSubmit(e)}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your username"
            value={name}
            onChange={event => setName(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={event => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={event => setPassword(event.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicAge">
          <Form.Label>Your age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Age"
            min={1}
            value={age}
            onChange={event => setAge(event.target.value)}
          />
        </Form.Group>
        <Row className="mt-5 justify-content-center">
          <Col xs={8} sm={8}>
            <Button className="w-100" variant="primary" type="submit">
              Register
            </Button>
          </Col>
        </Row>
        <Row className="mt-3 justify-content-center">
          <Col xs={8} sm={8}>
            <Button
              className="w-100"
              variant="outline-dark"
              onClick={() => navigate('/login')}
            >
              Back
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

const ErrorMessage = ({ errorMessage }: { errorMessage: string }) => {
  return <div className={styles.error}>{errorMessage}</div>;
};
