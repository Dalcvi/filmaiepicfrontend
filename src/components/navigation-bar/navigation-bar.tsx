import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { logoutUser } from '../../store/user/user.reducer';

export function NavigationBar() {
  const navigate = useNavigate();

  const user = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  const onLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand onClick={() => navigate('/')}>Navbar</Navbar.Brand>
        <Nav className="ms-auto">
          <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
          {user && (
            <Nav.Link onClick={() => navigate('profile')}>Profile</Nav.Link>
          )}
          {!user ? (
            <Nav.Link onClick={() => navigate('login')}>
              Login / Register
            </Nav.Link>
          ) : (
            <Nav.Link
              onClick={() => {
                onLogout();
                navigate('/');
              }}
            >
              Log out
            </Nav.Link>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}
