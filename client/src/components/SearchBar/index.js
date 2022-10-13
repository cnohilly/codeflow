import React, { useState, useEffect, useRef } from 'react';
import { Card, Form, Button, InputGroup } from 'react-bootstrap';

const SearchBar = (props) => {
  const {
    searchOptions
  } = props;

  const searchType = useRef();
  // const [searchVal, setSearchVal] = useState('');
  const searchVal = useRef();

  useEffect(() => {
    console.log(searchType.current.value, searchVal);
  }, [searchVal])

  return (
    // search bar card
    <Card className="dark-card-bg shadow mb-4 ">
      <Card.Body>
        <Form>
          <InputGroup>
            {/* select menu */}
            <Form.Select
              aria-label="Select"
              className="bg-dark text-light w-100"
              ref={searchType}
            >
              {searchOptions.map(option => {
                return (<option value={option.toLowerCase().split(' ').join('-')}>{option}</option>)
              })};
              {/* <option value="title">Title</option> */}
              {/* <option value="tag">Tag</option> */}
            </Form.Select>
            {/* search field */}
            <Form.Control
              type="text"
              placeholder="Search projects by title or tag"
              className="bg-dark text-light"
              // value={searchVal}
              ref={searchVal}
              maxlength="100"
            />
            <Button
              variant="success"
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