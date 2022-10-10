import React from 'react';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';

const SearchBar = () => {

  return (
    // search bar card
    <Card className="bg-dark bg-gradient shadow mb-4 ">
      <Card.Body>
        <Form>
          <InputGroup>
            {/* select menu */}
            <Form.Select 
              aria-label="Select"
              className="text-bg-dark w-100"
            >
              <option value="title">Title</option>
              <option value="tag">Tag</option>
            </Form.Select>
            {/* search field */}
            <Form.Control
              type="text"
              placeholder="Search projects by title or tag"
              className="bg-dark text-white"
            />
            <Button 
              variant="primary" 
              id="button-addon2"
              type="submit"
              className=""
            >
              <i class="bi bi-search"></i>
            </Button>
          </InputGroup>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SearchBar;