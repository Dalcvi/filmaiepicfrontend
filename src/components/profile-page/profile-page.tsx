import React, { useEffect, useState } from 'react';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { deleteAccount } from '../../services/user-services';
import { logoutUser } from '../../store/user/user.reducer';
import styles from './profile-page.module.css';

function ProfilePage() {
  const user = useAppSelector(state => state.user.user);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [spinner, setSpinner] = useState(false);
  console.log(user);
  useEffect(() => {
    if (user === null) {
      navigate('/');
    }
  }, [navigate, user]);
  const deleteUserAccount = async () => {
    setSpinner(true);
    await deleteAccount(user?.name ?? '').then(() => {
      dispatch(logoutUser());
      navigate('/');
      setSpinner(false);
    });
  };

  if (spinner) {
    return (
      <Container className={styles.spinnerCentered}>
        <Spinner animation={'border'} />
      </Container>
    );
  }

  return (
    <Container>
      <h2 className={styles.general}>General information</h2>
      <Row className="text-center mt-5">
        <Col>
          <h6>Name</h6>
          <p>{user?.name}</p>
        </Col>
        <Col>
          <h6>Email</h6>
          <p>{user?.email}</p>
        </Col>
        <Col>
          <h6>Age</h6>
          <p>{user?.age}</p>
        </Col>
      </Row>
      <Row className="text-center mt-5">
        <Col>
          <h6>Last login at</h6>
          <p>{new Date(user?.lastLoginAt ?? '').toLocaleDateString()}</p>
        </Col>
        <Col>
          <h6>Created at</h6>
          <p>{new Date(user?.createdAt ?? '').toLocaleDateString()}</p>
        </Col>
      </Row>
      <Row>
        <Col className={styles.centeredButton}>
          <Button variant="danger  mt-5" onClick={() => deleteUserAccount()}>
            Delete Account
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default ProfilePage;
