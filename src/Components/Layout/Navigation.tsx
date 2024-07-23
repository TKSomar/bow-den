import { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../../store/authSlice';
import { Outlet } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Login from '../Login/Login';
import SellItemForm from '../SellItem/SellItemForm';

function Navigation() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [showLoginAlert, setShowLoginAlert] = useState(false);

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSellModal, setShowSellModal] = useState(false);

  const handleShowLoginModal = () => {
    setShowLoginModal(true);
  };
  const handleHideLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleShowSellModal = () => {
    if (!isAuthenticated) {
      setShowLoginAlert(true);
    } else {
      setShowSellModal(true);
    }
  };
  const handleHideSellModal = () => {
    setShowSellModal(false);
  };
  
  return (
    <div>
      <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Bowyers Den</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              {/* Nav items go here */}
            </Nav>
            <Navbar.Text className="justify-content-end" >
              {!isAuthenticated && (
                <Button onClick={handleShowLoginModal} className="text-white mx-1" variant="primary" size="sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-box-arrow-in-right mx-1" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
                  <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
                </svg>
                Log in
              </Button>
              )}

              <Button onClick={handleShowSellModal} className="text-white mx-1" variant="primary" size="sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cash-coin mx-1" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0"/>
                  <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z"/>
                  <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z"/>
                  <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567"/>
                </svg>  
                Sell
              </Button>
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Login show={showLoginModal} onHide={handleHideLoginModal} />

      <Alert variant="danger" show={showLoginAlert} onClose={() => setShowLoginAlert(false)} dismissible>
        <Alert.Heading>Oops!</Alert.Heading>
        <p>
          Please login or register before you sell
        </p>
      </Alert>

      <SellItemForm show={showSellModal} onHide={handleHideSellModal} />

      <Outlet />
    </div>
    
  );
}

export default Navigation;