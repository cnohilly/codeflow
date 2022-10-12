import React from 'react';
import { Card, Row } from 'react-bootstrap';
import Comment from '../Comment';

const CommentList = (props) => {

  const {
    comments,
    includeReplies = false
  } = props;

  if (!comments) {
    return (
      <Row xs={1} className="g-3">
        <Card className="dark-card-bg text-light shadow mb-3">
          <Card.Body>
            <Card.Text>
              <h5>No comments to display.</h5>
            </Card.Text>
          </Card.Body>
        </Card>
      </Row>
    )
  }

  return (
    <Row xs={1} className="g-3">
      {comments.map(comment => {
        return <Comment key={comment._id} comment={comment} includeReplies={includeReplies} />
      })}

    </Row>
  );
};

export default CommentList;