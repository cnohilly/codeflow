import React from 'react';
import { Row } from 'react-bootstrap';
import Comment from '../Comment';
import ReplyForm from '../ReplyForm';
import Reply from '../Reply';

const CommentList = () => {

  return (
    <Row xs={1} className="g-3">

      {/* test comments */}
      <Comment />
      <Comment />
      <Comment />

    </Row>
  );
};

export default CommentList;