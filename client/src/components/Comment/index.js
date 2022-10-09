import { React, useState } from 'react';
import { Col, Card, Button, ButtonGroup, ButtonToolbar, Form } from 'react-bootstrap';
// import CommentList from '../CommentList';
import ReplyForm from '../ReplyForm';
import EditForm from '../EditForm';

const Comment = () => {
  // displaying children replies
  const [areChildrenHidden, setAreChildrenHidden] = useState(true);
  // displaying reply form
  const [displayReplyForm, setDisplayReplyForm] = useState(false);
  // displaying edit form
  const [displayEditForm, setDisplayEditForm] = useState(false);

  return (
    <Col>
      {/* comment card */}
      <Card className="bg-dark bg-gradient text-white shadow mb-3">
        <Card.Body>
          <div className="d-flex">
            <div className="flex-shrink-0">
              {/* profile image */}
              <img
                src="https://toppng.com/uploads/thumbnail/roger-berry-avatar-placeholder-115629915618zfpmweri9.png"
                alt="..."
                style={{ width: "36px" }}
              />
            </div>

            <div className="flex-grow-1">
              <div className="ms-3">
                {/* comment user info */}
                <Card.Subtitle
                  className="my-2"
                >
                  UserComment on 10/06/22
                </Card.Subtitle>

                {!displayEditForm ? (
                  <>
                    {/* comment text */}
                    <Card.Text>
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eos a alias aliquam veritatis cupiditate dolore qui sit inventore possimus, natus odio molestiae illum quis officiis sed laborum labore saepe impedit.
                    </Card.Text>
                    <ButtonToolbar aria-label="Toolbar with button groups" className="mt-1 ms-1">
                      {/* like button */}
                      <div className="d-flex align-items-center me-2">
                        <Button
                          variant="link"
                          type="button"
                          aria-label="Like"
                          className="link-primary pe-2"
                        >
                          <i class="bi bi-suit-heart-fill"></i>
                        </Button>
                        {/* number of likes */}
                        <div>
                          # of Likes
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
                          Reply
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
                          Edit
                        </Button>
                        {/* delete button */}
                        <Button
                          variant="link"
                          type="button"
                          aria-label="Delete"
                          className="link-danger"
                        >
                          <i className="bi bi-trash-fill"></i>
                          Delete
                        </Button>
                      </ButtonGroup>
                    </ButtonToolbar>
                  </>
                ) : (
                  // edit form
                  <EditForm 
                    displayEditForm={displayEditForm}
                    setDisplayEditForm={setDisplayEditForm}
                  />
                )}
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* reply form */}
      {displayReplyForm ? (
        <ReplyForm
          displayReplyForm={displayReplyForm}
          setDisplayReplyForm={setDisplayReplyForm}
        />
      ) : (
        ''
      )}

      {/* button to display nested comments */}
      {/* render 'show replies' button if comment has nested comments */}
      {areChildrenHidden ? (
        <Button
          variant="primary"
          type="button"
          aria-label="Show Replies"
          onClick={() => setAreChildrenHidden(!areChildrenHidden)}
        >
          Show Replies
        </Button>
      ) : (
        // container for nested comments
        <div className="d-flex">
          {/* collapsing line button for hiding replies */}
          <Button
            variant="primary"
            type="button"
            aria-label="Hide Replies"
            className="p-0 pe-1 me-3"
            onClick={() => setAreChildrenHidden(!areChildrenHidden)}
          />
          <div>

            {/* <CommentList /> */}

            Comment 1 
            Comment 2 
            Comment 3

          </div>
        </div>
      )}
    </Col>
  );
};

export default Comment;