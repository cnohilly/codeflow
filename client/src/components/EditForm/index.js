import React, { useState } from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { EDIT_COMMENT } from '../../utils/mutations';

const EditForm = (props) => {
  const CHARACTER_MAX = 300;

  const {
    id,
    toggleEditForm,
    commentBody
  } = props

  const [editCommentBody, setEditCommentBody] = useState(commentBody);

  const [editComment] = useMutation(EDIT_COMMENT);

  const handleFormSubmit = async event => {
    event.preventDefault();

    const comment = await editComment({
      variables: {
        id,
        commentBody: editCommentBody
      }
    });

    toggleEditForm();
  }

  const handleChange = async event => {
    if (event.target.value.length <= CHARACTER_MAX) {
      setEditCommentBody(event.target.value);
    }
  }

  return (
    // edit form
    <Form
      onSubmit={handleFormSubmit}
    >
      <Form.Group controlId="editForm">
        {/* label */}
        <FloatingLabel
          controlId="edit-textarea"
          label="Edit comment"
          className="text-muted"
        >
          {/* edit textarea */}
          <Form.Control
            as="textarea"
            placeholder="Edit comment"
            className="bg-dark text-white"
            value={editCommentBody}
            onChange={handleChange}
            autoFocus
          />
        </FloatingLabel>
      </Form.Group>
      <div className="d-flex justify-content-end mt-3">
        {/* update button */}
        <Button
          variant="success"
          type="submit"
          size="sm"
          className="rounded-pill px-3 me-2 fw-bold"
        >
          Update
        </Button>
        {/* cancel button */}
        <Button
          variant="danger"
          type="button"
          size="sm"
          className="rounded-pill px-3 fw-bold"
          onClick={toggleEditForm}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default EditForm;