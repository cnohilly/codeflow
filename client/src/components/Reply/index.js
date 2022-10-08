import { React, useState } from 'react';
import { Row, Col, Card, Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import ReplyForm from '../ReplyForm';

const Reply = () => {
  // displaying children replies
  const [areChildrenHidden, setAreChildrenHidden] = useState(true);
  // displaying reply form
  const [displayReplyForm, setDisplayReplyForm] = useState(false);

  return (
    // reply card
    <Col>
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
                {/* reply user info */}
                <Card.Subtitle 
                  className="my-2"
                >
                  UserReply on 11/11/22
                </Card.Subtitle>
                {/* reply text */}
                <Card.Text>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Harum ullam 
                  pariatur qui tempora ratione nostrum quae tenetur quo repellendus? Nostrum 
                  deleniti voluptate corrupti quam mollitia placeat, suscipit incidunt vitae quas.
                </Card.Text>
              </div>
              
              <ButtonToolbar aria-label="Toolbar with button groups" className="mt-1 ms-1">
                {/* like button */}
                <div className="d-flex align-items-center me-2">
                  <Button 
                    variant="link" 
                    type="button" 
                    aria-label="Like" 
                    className="link-primary pe-2"
                  >
                    <i className="bi bi-heart-fill"></i>
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
                    <i class="bi bi-chat-square-fill"></i>
                    Reply
                  </Button>
                  {/* edit button */}
                  <Button 
                    variant="link" 
                    type="button" 
                    aria-label="Edit"
                    className="link-warning"
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
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* reply form */}
      <ReplyForm 
        displayReplyForm={displayReplyForm}
        setDisplayReplyForm={setDisplayReplyForm}
      />

      {/* button to show replies */}
      <Button 
        variant="primary" 
        type="button" 
        aria-label="Show Replies"
        className={`${!areChildrenHidden ? "d-none" : "" }`}
        onClick={() => setAreChildrenHidden(!areChildrenHidden)}
      >
        Show Replies
      </Button>
      <div className={`d-flex ${areChildrenHidden ? "d-none" : ""}`}>
        {/* collapsing line button for hiding replies */}
        <Button 
          variant="primary" 
          type="button" 
          aria-label="Hide Replies" 
          className="p-0 pe-1 me-3"
          onClick={() => setAreChildrenHidden(!areChildrenHidden)}
        />
        <div>
          {/* temporary heading for container 1 */}
          <Row xs={1} className="g-3">
            <h4 className="text-white">Reply 1</h4>
            <h4 className="text-white">Reply 2</h4>
            <h4 className="text-white">Reply 3</h4>
          </Row>
        </div>
      </div>
    </Col>
  );
};

export default Reply;