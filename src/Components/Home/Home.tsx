import { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Card } from 'react-bootstrap';
import ItemCardList from '../ItemCardList/ItemCardList';
import { ItemCard } from '../../Types/ItemCard';

function Home() {
  const [items, setItems] = useState<ItemCard[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/items');
        setItems(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <Card className="my-3">
            {items.length > 0 ?
              <ItemCardList items={items} /> : <p>No items found</p>
            }
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;