import React, { ReactElement, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { app } from '../../auth/config/firebase';
import { Button, Form, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../store/authSlice';

const Register: React.FC<{ show: boolean; onHide: () => void }> = ({ show, onHide }): ReactElement => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleHideToast = () => {
    setShowToast(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Successfully registered with email:', email);

        dispatch(setUser(email));
        onHide();
        setShowToast(true);
        navigate('/');
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
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
              Register
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <p>Already have an account?</p> <Button onClick={onHide}>Login</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Register;
