import React from 'react';
import { Row } from 'react-bootstrap';
import Comment from '../Comment';

const CommentList = () => {

  return (
    <Row xs={1} className="g-3">
      
      {/* test comment */}
      <Comment />
      <Comment />

    </Row>
  );
};

export default CommentList;