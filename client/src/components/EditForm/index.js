import React from 'react';
import { Form, Button, FloatingLabel } from 'react-bootstrap';

const EditForm = (props) => {
  const { displayEditForm, setDisplayEditForm } = props
  
  return (
    // edit form
    <Form>
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
            autoFocus
            placeholder="Edit comment"
            className="bg-dark text-white"
          />
        </FloatingLabel>
      </Form.Group>
      <div className="d-flex justify-content-end mt-3">
        {/* update button */}
        <Button 
          variant="primary" 
          type="button" 
          size="sm" 
          className="rounded-pill px-3 me-2"
          onClick={() => console.log("Updated!")}
        >
          Update
        </Button>
        {/* cancel button */}
        <Button 
          variant="danger" 
          type="button" 
          size="sm" 
          className="rounded-pill px-3"
          onClick={() => setDisplayEditForm(!displayEditForm)}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default EditForm;