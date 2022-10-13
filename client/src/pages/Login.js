import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Container } from 'react-bootstrap';

import Auth from '../utils/auth';

const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };

  return (
    <Container>
      <section className="flex-row justify-center my-4">
        <div className="col-12 col-md-6 mx-auto">
          <div id="loginForm" className="card dark-card-bg text-light">
            <h4 className="card-header header-bg-color text-light text-center">Login</h4>
            <div className="card-body">
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input bg-dark text-light border-secondary"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input bg-dark text-light border-secondary"
                  placeholder="******"
                  name="password"
                  type="password"
                  id="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button className="btn btn-success d-block w-100 rounded-pill py-2 fs-5 fw-semibold" type="submit">
                  Login
                </button>
              </form>

              {error && <div className="mt-2 text-danger">Login failed</div>}
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default Login;