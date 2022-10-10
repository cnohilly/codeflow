import { React, useState } from 'react';
import { Col, Card, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import ReplyForm from '../ReplyForm';
import EditForm from '../EditForm';
import CommentList from '../CommentList'
import { useQuery } from '@apollo/client';
import { QUERY_COMMENT } from '../../utils/queries';

const Comment = (props) => {

  let { comment } = props;
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

  if (loading) {
    return (
      <Card className="bg-dark bg-gradient text-white shadow mb-3">
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
        <Card className="bg-dark bg-gradient text-white shadow mt-3">
          <Card.Body>
            <div className="d-flex">
              <div className="flex-shrink-0">
                {/* profile image */}
                <img
                  src={comment.createdBy.profileImage || "https://toppng.com/uploads/thumbnail/roger-berry-avatar-placeholder-115629915618zfpmweri9.png"}
                  alt={`Avatar for ${comment.createdBy.username}`}
                  style={{ width: "36px", borderRadius: "50%" }}
                />
              </div>

              <div className="flex-grow-1">
                <div className="ms-3">
                  {/* comment user info */}
                  <Card.Subtitle
                    className="my-2 d-flex flex-column flex-md-row justify-content-between"
                  >
                    <div className="me-5">
                      {comment.createdBy.username}
                    </div>
                    <div >
                      {!comment.lastEditedAt
                        ? `Posted on ${comment.createdAt}`
                        : `Edited on ${comment.lastEditedAt}`}
                    </div>
                  </Card.Subtitle>
                  {!displayEditForm ? 
                    <>
                      {/* comment text */}
                      <Card.Text>
                        {comment.commentBody}
                      </Card.Text>
                      {/* comment text */}
                      <ButtonToolbar aria-label="Toolbar with button groups" className="mt-1 ms-1">
                        {/* like button */}
                        <div className="d-flex align-items-center me-2">
                          <Button
                            variant="link"
                            type="button"
                            aria-label="Like"
                            className="link-primary pe-2"
                          >
                            <i className="bi bi-suit-heart-fill"></i>
                          </Button>
                          {/* number of likes */}
                          <div>
                            {comment.likeCount} {comment.likeCount > 1 || comment.likeCount === 0 ? 'Likes' : 'Like'}
                          </div>
                        </div>
                        <ButtonGroup aria-label="Button group">
                          {/* reply button */}
                          <Button
                            variant="link"
                            type="button"
                            aria-label="Reply"
                            className="link-info"
                            onClick={() => setDisplayReplyForm(!displayReplyForm)}
                          >
                            <i className="bi bi-chat-square-fill"></i>
                          </Button>
                          {/* edit button */}
                          <Button
                            variant="link"
                            type="button"
                            aria-label="Edit"
                            className="link-warning"
                            onClick={() => setDisplayEditForm(!displayEditForm)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </Button>
                          {/* delete button */}
                          <Button
                            variant="link"
                            type="button"
                            aria-label="Delete"
                            className="link-danger"
                          >
                            <i className="bi bi-trash-fill"></i>
                          </Button>
                        </ButtonGroup>
                      </ButtonToolbar>
                    </>
                    : 
                    // edit form
                    <EditForm
                      commentBody={comment.commentBody}
                      displayEditForm={displayEditForm}
                      setDisplayEditForm={setDisplayEditForm}
                    />
                  }
                </div>
              </div>
            </div>
          </Card.Body>
        </Card>
        :
        <Card className="bg-dark bg-gradient text-white shadow mb-3">
          <Card.Body>
            <Card.Text>
              Comment deleted by user.
            </Card.Text>
          </Card.Body>
        </Card>
      }

      {/* reply form */}
      {displayReplyForm ? 
        <ReplyForm
          displayReplyForm={displayReplyForm}
          setDisplayReplyForm={setDisplayReplyForm}
        />
        : ''
      }

      {/*  button and section to have reply   */}
      {comment.commentCount > 0 &&
        <>
          {areChildrenHidden
            ?
            // {/* button to show replies */}
            <Button
              variant="primary"
              type="button"
              aria-label="Show Replies"
              className="px-2"
              onClick={() => setAreChildrenHidden(!areChildrenHidden)}
            >
              {`Show ${comment.commentCount} ${comment.commentCount > 1 ? 'Replies' : 'Reply'}`}
            </Button>
            :
            // container for nested child comments
            <div className={`d-flex`}>
              {/* collapsing line button for hiding replies */}
              <Button
                variant="primary"
                type="button"
                aria-label="Hide Replies"
                className="p-0 pe-1 me-3"
                onClick={() => setAreChildrenHidden(!areChildrenHidden)}
              />
              <div className="flex-grow-1">
                {/* comment list */}
                <CommentList comments={comment.comments} />
              </div>
            </div >
          }
        </>
      }
    </Col>
  );
};

export default Comment;