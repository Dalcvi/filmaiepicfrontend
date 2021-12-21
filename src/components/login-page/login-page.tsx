import React, { FormEvent, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { login } from '../../services/user-services';
import { loginUser } from '../../store/user/user.reducer';
import styles from './login-page.module.css';

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector(state => state.user.user);
  if (user) {
    navigate('/');
  }
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    const user = await login(email, password);
    if (!user) {
      setError('Wrong email or password!');
      return;
    }
    console.log(user);
    dispatch(loginUser(user));
    navigate('/');
  };

  return (
    <div className={styles.centered}>
      <Form className="w-25" onSubmit={e => onSubmit(e)}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            required
            onChange={event => setEmail(event.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            minLength={5}
            value={password}
            required
            onChange={event => setPassword(event.target.value)}
          />
        </Form.Group>
        <Row className="mt-5 justify-content-center">
          <Col xs={8} sm={8}>
            <Button className="w-100" variant="primary" type="submit">
              Login
            </Button>
          </Col>
        </Row>
        <Row className="mt-3 justify-content-center">
          <Col xs={8} sm={8}>
            <Button
              className="w-100"
              variant="outline-dark"
              onClick={() => navigate('/register')}
            >
              Register
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
