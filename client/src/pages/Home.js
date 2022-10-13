import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import ProjectForm from '../components/ProjectForm';
import ProjectList from '../components/ProjectList';
import SearchBar from '../components/SearchBar';
import ScrollToTopBtn from '../components/ScrollToTopBtn';
import { QUERY_PROJECTS } from '../utils/queries';
import { useQuery } from '@apollo/client';

const Home = () => {

  const { loading, data } = useQuery(QUERY_PROJECTS);
  const projects = data?.projects || [];
  let filteredProjects = [];

  const searchOptions = ['Title', 'Tag'];

  const [searchState, setSearchState] = useState({ type: 'title', value: '' });

  const updateSearch = (type, val) => {
    setSearchState = setSearchState({ type: type, value: val });
  }

  useEffect(() => {
    if (!loading) {
      if (!searchState.value) {
        filteredProjects = [];
      } else if (searchState.type === 'title') {
        filteredProjects = projects.filter(project => {
          return project.projectTitle.contains(searchState.value);
        });
      } else if (searchState.type === 'tag'){
        filteredProjects = projects.filter(project => {
          return project.projectTags.includes(searchState.value);
        })
      }
    }
  }, [searchState])

  return (
    // section for Homepage
    <div id="home" className="scroll-margin">
      {/* section for hero */}
      <section id="hero" className="py-4 py-md-5 dark-card-bg text-center text-white bg-animation">
        <div className="py-md-5">
          {/* animated text using animate.css */}
          <h1 className="display-1 fw-semibold brand">
            <span className="animate__animated animate__fadeInDown animatespan custom-delay-1">
              Code
            </span>
            <span className="text-success animate__animated animate__fadeInUp animatespan custom-delay-1">
              Flow
            </span>
          </h1>
          <h2>
            <span className="animate__animated animate__fadeInRight animatespan custom-delay-2">Design</span>
            <span className="text-success px-0 px-md-3 animate__animated animate__fadeInRight animatespan custom-delay-3">/</span>
            <span className="animate__animated animate__fadeInRight animatespan custom-delay-4">Develop</span>
            <span className=" text-success px-0 px-md-3 animate__animated animate__fadeInRight animatespan custom-delay-5">/</span>
            <span className="animate__animated animate__fadeInRight animatespan custom-delay-6">Deploy</span>
          </h2>
        </div>
      </section>

      <ScrollToTopBtn />

      {/* container for project card list */}
      <Container id="home-project-list" className="py-4">

        {/* Search Bar */}
        <SearchBar searchOptions={searchOptions} />

        {/* Project Form */}
        <ProjectForm />

        {/* Project List */}
        {loading
          ? <h2 className="text-white text-center">Loading Projects...</h2>
          : <ProjectList projects={filteredProjects ? filteredProjects : projects} />
        }

      </Container>
    </div>
  );
};

export default Home;