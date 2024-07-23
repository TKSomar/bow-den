import React, { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { ItemCard } from '../../Types/ItemCard';

interface ItemCardProps {
  item: ItemCard;
}

const ItemCardComponent: React.FC<ItemCardProps> = ({ item }) => {
  const [showModal, setShowModal] = useState(false);

  const handleBuyButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Card className='m-2' style={{ width: '18rem' }}>
        <Card.Link href="#" onClick={handleBuyButtonClick}>
          <Card.Img variant="top" src={item.image} />
        </Card.Link>
        <Card.Body>
          <Card.Link href="#" onClick={handleBuyButtonClick}>
            <Card.Title>{item.name}</Card.Title>
          </Card.Link>
          <Card.Text>
            ${item.price}
          </Card.Text>
          <Card.Text>
            {item.brand}
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{item.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img alt="preview of selected bow" src={item.image} style={{ width: '100%' }} />
          <p><strong>Price:</strong> ${item.price}</p>
          <p><strong>Brand:</strong> {item.brand}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Buy Now
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ItemCardComponent;
