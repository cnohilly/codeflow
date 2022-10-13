import React from "react";
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap";

const BioButton = (props) => {
  const { toggleBioForm } = props;

  return (
    <ButtonToolbar aria-label="Bio Button">
      <ButtonGroup aria-label="Button group">
        <Button
          variant="link"
          type="button"
          aria-label="Edit"
          className="link-warning"
          onClick={toggleBioForm}
        >
          <i className="bi bi-pencil-square"></i>
        </Button>
      </ButtonGroup>
    </ButtonToolbar>
  );
};

export default BioButton;
