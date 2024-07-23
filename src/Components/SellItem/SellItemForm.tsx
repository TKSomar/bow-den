import React, { ReactElement, useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import SellItemToast from './SellItemToast';

const SellItemForm: React.FC<{ show: boolean; onHide: () => void }> = ({ show, onHide }): ReactElement => {
  const [newItem, setNewItem] = useState({
    name: '',
    price: 0,
    brand: '',
    image: '',
  });

  const [showToast, setShowToast] = useState(false);

  const handleHideToast = () => {
    setShowToast(false);
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewItem({
      ...newItem,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      await axios.post('http://localhost:5000/api/items', newItem);

      onHide();
      setShowToast(true);

      setTimeout(function(){
        window.location.reload();
    }, 3000);
    } catch (error: any) {
      console.error('Error adding item:', error);
  
      // Log the entire Axios error object
      console.log(error);

      console.log('Error status:', error.response?.status);
      console.log('Error data:', error.response?.data);
    }
  };
  

  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Sell a bow</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
          <Form.Group controlId="formName">
            <Form.Label>Name:</Form.Label>
            <Form.Control type="text" name="name" value={newItem.name} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formPrice">
            <Form.Label>Price:</Form.Label>
            <Form.Control type="number" name="price" value={newItem.price} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formBrand">
            <Form.Label>Brand:</Form.Label>
            <Form.Control type="text" name="brand" value={newItem.brand} onChange={handleInputChange} />
          </Form.Group>

          <Form.Group controlId="formImage">
            <Form.Label>Image:</Form.Label>
            <Form.Control type="text" name="image" value={newItem.image} onChange={handleInputChange} />
          </Form.Group>

          <Button className="m-2" variant="primary" type="submit">
            Sell
          </Button>
      </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <SellItemToast show={showToast} onHide={handleHideToast} />
    </>
  );
};

export default SellItemForm;
