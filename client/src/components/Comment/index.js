import React, { useState } from 'react';
import { Col, Card, Button } from 'react-bootstrap';
import CommentForm from '../CommentForm';
import EditForm from '../EditForm';
import CommentList from '../CommentList'
import CommentButtons from '../CommentButtons';
import { useQuery } from '@apollo/client';
import { QUERY_COMMENT } from '../../utils/queries';

const Comment = (props) => {

  let {
    comment,
    includeReplies
  } = props;
  const { loading, data } = useQuery(QUERY_COMMENT, {
    variables: { id: comment._id }
  });

  comment = data?.comment || {};

  // displaying children replies
  const [areChildrenHidden, setAreChildrenHidden] = useState(true);
  // displaying reply form
  const [displayReplyForm, setDisplayReplyForm] = useState(false);
  // displaying edit form
  const [displayEditForm, setDisplayEditForm] = useState(false);

  const toggleReplyForm = () => {
    setDisplayReplyForm(!displayReplyForm);
  }

  const toggleEditForm = () => {
    setDisplayEditForm(!displayEditForm);
  }

  const displayChildren = () => {
    setAreChildrenHidden(false);
  }

  if (loading) {
    return (
      <Card className="dark-card-bg text-light shadow mb-3">
        <Card.Body>
          <Card.Text>
            Loading comment...
          </Card.Text>
        </Card.Body>
      </Card>
    )
  };

  return (
    <Col>
      {/* comment card */}
      {!comment.isDeleted
        ?
        <Card className="dark-card-bg text-light shadow">
          <Card.Body>
            <div className="d-flex">
              <div className="flex-shrink-0">
                {/* profile image */}
                <img
                  src={comment.createdBy.profileImage || "https://toppng.com/uploads/thumbnail/roger-berry-avatar-placeholder-115629915618zfpmweri9.png"}
                  alt={`Avatar for ${comment.createdBy.username}`}
                  style={{ width: "36px", borderRadius: "50%" }}
                  className="ar1x1"
                />
              </div>

              <div className="flex-grow-1">
                <div className="ms-3">
                  {/* comment user info */}
                  <Card.Subtitle
                    className="my-2 d-flex flex-column flex-md-row justify-content-between"
                  >
                    <Card.Link
                      href={`../profile/${comment.createdBy.username}`}
                      className="text-decoration-none link-light"
                    >

                      <div className="fw-bold mb-1 mb-md-0">
                        {comment.createdBy.username}
                      </div>
                    </Card.Link>
                    <div className="text-secondary">
                      {!comment.lastEditedAt
                        ? `Posted on ${comment.createdAt}`
                        : `Edited on ${comment.lastEditedAt}`}
                    </div>
                  </Card.Subtitle>
                  {!displayEditForm ?
                    <>
                      {/* comment text */}
                      <Card.Text className="my-3">
                        {comment.commentBody}
                      </Card.Text>

                      {/* comment buttons group */}
                      <CommentButtons
                        toggleReplyForm={toggleReplyForm}
                        toggleEditForm={toggleEditForm}
                        comment={comment}
                      />
                    </>
                    :
                    // edit form
                    <EditForm
                      id={comment._id}
                      commentBody={comment.commentBody}
                      toggleEditForm={toggleEditForm}
                    />
                  }
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
        :
        <Card className="dark-card-bg text-light shadow">
          <Card.Body>
            <Card.Text>
              Comment deleted by user.
            </Card.Text>
          </Card.Body>
        </Card>
      }

      {/* reply form */}
      {displayReplyForm ?
        <CommentForm
          projectId={comment.projectId._id}
          parentCommentId={comment._id}
          toggleReplyForm={toggleReplyForm}
          displayChildren={displayChildren}
        />
        : ''
      }

      {/*  button and section to have reply   */}
      {(comment.commentCount > 0 && includeReplies) &&
        <>
          {areChildrenHidden
            ?
            // {/* button to show replies */}
            <Button
              variant="success"
              type="button"
              aria-label="Show Replies"
              className="mt-3 fw-bold rounded-pill"
              onClick={() => setAreChildrenHidden(!areChildrenHidden)}
            >
              {`Show ${comment.commentCount} ${comment.commentCount > 1 ? 'Replies' : 'Reply'}`}
            </Button>
            :
            // container for nested child comments
            <div className="d-flex">
              {/* collapsing line button for hiding replies */}
              <Button
                variant="success"
                type="button"
                aria-label="Hide Replies"
                className="p-0 pe-1 me-3 mt-1"
                onClick={() => setAreChildrenHidden(!areChildrenHidden)}
              />
              <div className="flex-grow-1 mt-3">
                {/* comment list */}
                <CommentList comments={comment.comments} includeReplies={includeReplies} />
              </div>
            </div >
          }
        </>
      }
    </Col>
  );
};

export default Comment;