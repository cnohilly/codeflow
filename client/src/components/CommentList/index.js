import React from 'react';
import { Row } from 'react-bootstrap';
import Comment from '../Comment';

const CommentList = (props) => {

  const {
    comments
  } = props;

  return (
    <Row xs={1} className="g-3">

      {comments.map(comment => {
        return <Comment key={comment._id} comment={comment} />
      })}

    </Row>
  );
};

export default CommentList;