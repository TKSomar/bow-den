import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../auth/config/firebase';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/authSlice';
import LoginToast from './LoginToast';
import Register from '../Register/Register';

const Login: React.FC<{ show: boolean; onHide: () => void }> = ({ show, onHide }): ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false); // State for Register modal

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleHideToast = () => {
    setShowToast(false);
  };

  const handleRegisterClick = () => {
    setShowRegisterModal(true);
    onHide(); // Hide the Login modal
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Successfully signed in with email:', email);

        dispatch(setUser(email));
        onHide();
        setShowToast(true);
        navigate('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Button className="m-2" variant="primary" type="button" onClick={handleSubmit}>
              Login
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p>Need an account?</p> <Button onClick={handleRegisterClick}>Register</Button>
        </Modal.Footer>
      </Modal>
      <LoginToast show={showToast} onHide={handleHideToast} />

      <Register show={showRegisterModal} onHide={() => setShowRegisterModal(false)} />
    </>
  );
};

export default Login;
