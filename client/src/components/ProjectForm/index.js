import React, { useState } from "react";
import { Col, Row, Card, Form, Button } from "react-bootstrap";

import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../../utils/mutations";
import { QUERY_PROJECTS, QUERY_ME } from "../../utils/queries";

const ProjectForm = () => {
  const [projectTitle, setTitle] = useState("");
  const [projectBody, setBody] = useState("");
  const [projectTags, setTags] = useState("");
  const [repoLink, setRepo] = useState("");
  const [deployedLink, setDeploy] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const [addProject, { error }] = useMutation(ADD_PROJECT, {
    update(cache, { data: { addProject } }) {
      // could potentially not exist yet, so wrap in a try/catch
      try {
        // update me array's cache
        const { me } = cache.readQuery({ query: QUERY_ME });
        cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, projects: [...me.projects, addProject] } },
        });
      } catch (e) {
        console.warn("First project insertion by user!");
      }

      // update thought array's cache
      const { projects } = cache.readQuery({ query: QUERY_PROJECTS });
      cache.writeQuery({
        query: QUERY_PROJECTS,
        data: { projects: [addProject, ...projects] },
      });
    },
  });

  // update state based on form input changes
  const handleChangeTitle = (event) => {
    if (event.target.value.length <= 300) {
      setTitle(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleChangeBody = (event) => {
    if (event.target.value.length <= 300) {
      setBody(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleChangeTags = (event) => {
    if (event.target.value.length <= 300) {
      setTags(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleChangeRepo = (event) => {
    if (event.target.value.length <= 300) {
      setRepo(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  const handleChangeDeploy = (event) => {
    if (event.target.value.length <= 300) {
      setDeploy(event.target.value);
      setCharacterCount(event.target.value.length);
    }
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log({
      projectTitle,
      projectBody,
      projectTags,
      repoLink,
      deployedLink,
    })
    try {
      await addProject({
        variables: {
          projectTitle,
          projectBody,
          projectTags,
          repoLink,
          deployedLink,
        },
      });

      // clear form value
      setTitle("");
      setBody("");
      setTags("");
      setRepo("");
      setDeploy("");
      setCharacterCount(0);
    } catch (e) {
      console.error(e);
    }
  };

  // displaying project form
  const [displayProjectForm, setDisplayProjectForm] = useState(false);

  return (
    // project form card
    <Col>
      <Card className="bg-dark bg-gradient text-white shadow mb-4">
        <Card.Body>
          {/* Toggle project form */}
          {!displayProjectForm ? (
            <Button
              variant="primary"
              type="button"
              className="rounded-pill fw-semibold"
              onClick={() => setDisplayProjectForm(!displayProjectForm)}
            >
              <i className="bi bi-plus-lg me-1"></i>
              Create Project
            </Button>
          ) : (
            <Form onSubmit={handleFormSubmit}>
              {/* project title input */}
              <Form.Group className="mb-3" controlId="formProjectTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  value={projectTitle}
                  className="bg-dark text-white"
                  onChange={handleChangeTitle}
                />
              </Form.Group>

              {/* Look up Tagify or Bootstrap Tags Input to manage tag input field*/}
              {/* project tag input */}
              <Form.Group className="mb-3" controlId="formProjectTags">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Tags"
                  value={projectTags}
                  className="bg-dark text-white"
                  onChange={handleChangeTags}
                />
              </Form.Group>

              {/* project description textarea */}
              <Form.Group className="mb-3" controlId="formProjectDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Description"
                  value={projectBody}
                  rows={4}
                  className="bg-dark text-white"
                  onChange={handleChangeBody}
                />
              </Form.Group>

              <Row xs={1} md={2}>
                {/* project deployed link input */}
                <Form.Group
                  as={Col}
                  controlId="formDeployedLink"
                  className="mb-3"
                >
                  <Form.Label>Deployed Application Link</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter deployed application link"
                    value={deployedLink}
                    className="bg-dark text-white"
                    onChange={handleChangeDeploy}
                  />
                </Form.Group>
                {/* project repo link input */}
                <Form.Group as={Col} controlId="formRepoLink" className="mb-3">
                  <Form.Label>GitHub Repository Link</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter GitHub repository link"
                    value={repoLink}
                    className="bg-dark text-white"
                    onChange={handleChangeRepo}
                  />
                </Form.Group>
              </Row>

              <div className="d-flex justify-content-end mt-3">
                {/* submit button */}
                <Button
                  variant="primary"
                  type="submit"
                  size="sm"
                  className="rounded-pill px-3 me-2 fw-semibold"
                >
                  Submit
                </Button>
                {/* cancel button */}
                <Button
                  variant="danger"
                  type="button"
                  size="sm"
                  className="rounded-pill px-3 fw-semibold"
                  onClick={() => setDisplayProjectForm(!displayProjectForm)}
                >
                  Cancel
                </Button>
              </div>
            </Form>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default ProjectForm;
