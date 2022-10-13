import React from 'react';
import { Button, ButtonGroup, ButtonToolbar } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { UPDATE_LIKE_COMMENT, DELETE_COMMENT } from '../../utils/mutations';
import Auth from '../../utils/auth';

const CommentButtons = (props) => {
  const {
    toggleReplyForm,
    toggleEditForm,
    comment
  } = props;

  const [updateLikeComment] = useMutation(UPDATE_LIKE_COMMENT)
  const [deleteComment] = useMutation(DELETE_COMMENT);

  const handleLike = event => {
    if (Auth.loggedIn()) {
      updateLikeComment({
        variables: { id: comment._id }
      });
    }
  }

  const handleDelete = event => {
    deleteComment({
      variables: { id: comment._id }
    });
  }

  return (
    <ButtonToolbar aria-label="Comment toolbar with button groups">
      {/* like button */}
      <div className="d-flex align-items-center me-2 fw-semibold">
        <Button
          variant="link"
          type="button"
          aria-label="Like"
          className="link-primary ps-0 pe-2"
          onClick={handleLike}
        >
          <i className="bi bi-suit-heart-fill"></i>
        </Button>
        {/* number of likes */}
        <div>
          {comment.likeCount} {comment.likeCount > 1 || comment.likeCount === 0 ? 'Likes' : 'Like'}
        </div>
      </div>
      <ButtonGroup aria-label="Button group">
        {/* will only render buttons if user is logged in*/}
        {Auth.loggedIn() &&
          <>
            {/* reply button */}
            <Button
              variant="link"
              type="button"
              aria-label="Reply"
              className="link-success"
              onClick={toggleReplyForm}
            >
              <i className="bi bi-chat-square-fill"></i>
            </Button>
            {/* will only render edit and delete buttons if user owns posts */}
            {comment.createdBy.username === Auth.getProfile().data.username &&
              <>
                {/* edit button */}
                <Button
                  variant="link"
                  type="button"
                  aria-label="Edit"
                  className="link-warning"
                  onClick={toggleEditForm}
                >
                  <i className="bi bi-pencil-square"></i>
                </Button>
                {/* delete button */}
                <Button
                  variant="link"
                  type="button"
                  aria-label="Delete"
                  className="link-danger"
                  onClick={handleDelete}
                >
                  <i className="bi bi-trash-fill"></i>
                </Button>
              </>
            }
          </>
        }
      </ButtonGroup>
    </ButtonToolbar>
  );
};

export default CommentButtons;