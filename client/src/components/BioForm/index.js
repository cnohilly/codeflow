import React, { useState } from "react";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { EDIT_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";

const BioForm = (props) => {
  const CHARACTER_MAX = 500;

  const { toggleBioForm, BioBody } = props;

  const [editBio, setBio] = useState(BioBody);

  const [editBioBody] = useMutation(EDIT_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const bio = await editBioBody({
      variables: {
        id: Auth.getProfile().data._id,
        input: {
          bio: setBio,
        },
      },
    });

    toggleBioForm();
  };

  const handleChange = async (event) => {
    if (event.target.value.length <= CHARACTER_MAX) {
      setBio(event.target.value);
    }
  };

  return (
    // edit form
    <Form onSubmit={handleFormSubmit}>
      <Form.Group controlId="bioForm">
        {/* label */}
        <FloatingLabel
          controlId="edit-textarea"
          label="Tell us about yourself"
          className="text-muted"
        >
          {/* edit textarea */}
          <Form.Control
            as="textarea"
            placeholder="Edit Bio"
            className="bg-dark text-white"
            value={editBio}
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
          onClick={toggleBioForm}
        >
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default BioForm;
