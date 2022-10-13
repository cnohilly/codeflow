import React, { useState, useRef, useEffect } from "react";
import { Col, Row, Card, Form, Button } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { ADD_PROJECT } from "../../utils/mutations";
import { QUERY_PROJECTS, QUERY_ME } from "../../utils/queries";
import Tagify from "@yaireo/tagify";

const ProjectForm = () => {
  const titleRef = useRef();
  const bodyRef = useRef();
  const tagsRef = useRef();
  const repoRef = useRef();
  const deployedRef = useRef();

  // displaying project form
  const [displayProjectForm, setDisplayProjectForm] = useState(false);

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

  if (error) {
    console.log(error);
  }

  let tagify = useRef();
  tagify.current = null;

  useEffect(() => {
    const tagifyWhitelist = [
      "HTML",
      "CSS",
      "JavaScript",
      "Node",
      "Handlebars",
      "Express",
      "MongoDB",
      "MySQL",
      "GraphQL",
      "React",
      "MERN",
    ];
    const tagifySettings = {
      backspace: "edit",
      // delimiters: ',| ',
      pattern: /^\S{1,20}$/,
      whitelist: tagifyWhitelist,
      dropdown: {
        enabled: 0,
        fuzzySearch: true,
        caseSensitive: false,
      },
      maxTags: 10,
      keepInvalid: false,
      editTags: {
        clicks: 1,
        keepInvalid: false,
      },
    };
    const inputEl = document.querySelector('input[name="tagify-tags"]');

    if (!tagify.current && inputEl) {
      tagify.current = new Tagify(inputEl, tagifySettings);
    }
  }, [displayProjectForm]);

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await addProject({
        variables: {
          projectTitle: titleRef.current.value,
          projectBody: bodyRef.current.value,
          projectTags: JSON.parse(tagsRef.current.value).map((tag) => {
            return tag.value;
          }),
          repoLink: repoRef.current.value,
          deployedLink: deployedRef.current.value,
        },
      });

      // clear form value
      titleRef.current.value = "";
      bodyRef.current.value = "";
      tagsRef.current.value = "";
      repoRef.current.value = "";
      deployedRef.current.value = "";
    } catch (e) {
      console.error(e);
    }
  };

  return (
    // project form card
    <Col>
      <Card className="dark-card-bg text-light shadow mb-4">
        <Card.Body>
          {/* Toggle project form */}
          {!displayProjectForm ? (
            <div className="d-grid">
              <Button
                variant="success"
                type="button"
                className="rounded-pill fw-bold"
                onClick={() => setDisplayProjectForm(!displayProjectForm)}
              >
                <i className="bi bi-plus-lg me-2"></i>
                Create Project
              </Button>
            </div>
          ) : (
            <Form onSubmit={handleFormSubmit}>
              {/* project title input */}
              <Form.Group className="mb-3" controlId="formProjectTitle">
                <Form.Label className="fs-5">Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Title"
                  className="bg-dark text-white"
                  ref={titleRef}
                />
              </Form.Group>

              {/* project tag input */}
              <Form.Group className="mb-3" controlId="formProjectTags">
                <Form.Control
                  name="tagify-tags"
                  className="bg-dark text-white"
                  placeholder="Tags"
                  ref={tagsRef}
                />
              </Form.Group>

              {/* project description textarea */}
              <Form.Group className="mb-3" controlId="formProjectDescription">
                <Form.Label className="fs-5">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  placeholder="Description"
                  rows={4}
                  className="bg-dark text-white"
                  ref={bodyRef}
                />
              </Form.Group>

              <Row xs={1} md={2}>
                {/* project deployed link input */}
                <Form.Group
                  as={Col}
                  controlId="formDeployedLink"
                  className="mb-3"
                >
                  <Form.Label className="fs-5">
                    Deployed Application Link
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='Enter deployed application link (Please include "http(s)://www.")'
                    className="bg-dark text-white"
                    ref={deployedRef}
                    maxLength="100"
                  />
                </Form.Group>
                {/* project repo link input */}
                <Form.Group as={Col} controlId="formRepoLink" className="mb-3">
                  <Form.Label className="fs-5">
                    GitHub Repository Link
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder='Enter GitHub repository link (Please include "http(s)://www.")'
                    className="bg-dark text-white"
                    ref={repoRef}
                    maxLength="100"
                  />
                </Form.Group>
              </Row>

              <div className="d-flex justify-content-end mt-3">
                {/* submit button */}
                <Button
                  variant="success"
                  type="submit"
                  size="sm"
                  className="rounded-pill px-3 me-2 fw-bold"
                >
                  Submit
                </Button>
                {/* cancel button */}
                <Button
                  variant="danger"
                  type="button"
                  size="sm"
                  className="rounded-pill px-3 fw-bold"
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
