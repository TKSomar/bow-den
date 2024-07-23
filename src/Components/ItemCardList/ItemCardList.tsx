import React, { useState } from 'react';
import { Container, Row, Pagination } from 'react-bootstrap';
import { ItemCard } from '../../Types/ItemCard';
import ItemCardComponent from '../ItemCard/ItemCard';

interface ItemCardListProps {
  items: ItemCard[];
}

const ITEMS_PER_PAGE = 12;

const ItemCardList: React.FC<ItemCardListProps> = ({ items }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Container className="my-3">
      <Row>
        <h1>In stock</h1>
      </Row>
      <Row>
        {currentItems.map((item, index) => (
          <ItemCardComponent key={index} item={item} />
        ))}
      </Row>
      <Row>
        <Pagination>
          {Array.from({ length: Math.ceil(items.length / ITEMS_PER_PAGE) }).map((_, index) => (
            <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </Row>
    </Container>
  );
};

export default ItemCardList;
