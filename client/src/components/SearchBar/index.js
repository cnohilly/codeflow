import React, { useRef } from 'react';
import { Card, Form, InputGroup } from 'react-bootstrap';

const SearchBar = (props) => {
  const {
    searchOptions,
    updateSearch
  } = props;

  const searchType = useRef();
  const searchVal = useRef();

  const onSearchChange = () => {
    updateSearch(searchType.current.value, searchVal.current.value);
  }

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
              onChange={onSearchChange}
            >
              {searchOptions.map(option => {
                const val = option.toLowerCase().split(' ').join('-');
                return (<option key={val} value={val}>{option}</option>)
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
              onChange={onSearchChange}
              maxLength="100"
            />
          </InputGroup>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default SearchBar;