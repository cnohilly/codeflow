import React from 'react';
import { Container } from 'react-bootstrap';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';
import SearchBar from '../components/SearchBar';
import { QUERY_PROJECTS } from '../utils/queries';
import { useQuery, useState } from '@apollo/client';

const Home = () => {

  const { loading, data } = useQuery(QUERY_PROJECTS);
  const projects = data?.projects || [];


  return (
    // section for Homepage
    <div id="home" className="scroll-margin">
      {/* section for hero */}
      <section id="hero" className="py-4 py-md-5 bg-dark d-flex flex-column justify-content-center align-items-center text-white">
        <div className="py-md-5">
          <h1 className="display-1 fw-semibold brand text-center">
            Code<span className="text-success">Flow</span>
          </h1>
          <h2>Design, Develop, Deploy</h2>
        </div>
      </section>


      {/* container for project card list */}
      <Container id="home-project-list" className="py-4 ">

        {/* Search Bar */}
        <SearchBar />

        {/* Project Form */}
        <ProjectForm />

        {/* Project List */}
        {loading
          ? <h2 className="text-white text-center">Loading Projects...</h2>
          : <ProjectList projects={projects} />
        }

      </Container>
    </div>
  );
};

export default Home;