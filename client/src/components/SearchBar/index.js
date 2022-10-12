import React from 'react';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';

const SearchBar = () => {

  return (
    // search bar card
    <Card className="dark-card-bg shadow mb-4 ">
      <Card.Body>
        <Form>
          <InputGroup>
            {/* select menu */}
            <Form.Select 
              aria-label="Select"
              className="bg-dark text-light w-100 fw-semibold"
            >
              <option value="title">Title</option>
              <option value="tag">Tag</option>
            </Form.Select>
            {/* search field */}
            <Form.Control
              type="text"
              placeholder="Search projects by title or tag"
              className="bg-dark text-light"
            />
            <Button 
              variant="primary" 
              id="button-addon2"
              type="submit"
            >
              <i className="bi bi-search"></i>
            </Button>
          </InputGroup>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SearchBar;