import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SingleProject from "./pages/SingleProject";
import ProfileMain from "./pages/ProfileMain";
<<<<<<< HEAD
=======
import ProfileProjects from "./pages/ProfileProjects";
import ProfileComments from "./pages/ProfileComments";
import FriendTab from "./pages/FriendTab";
>>>>>>> 96afe5b17b2b8d77c2a1b8538d1c1e83b58a60a4

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
<<<<<<< HEAD
        <div className="app-container d-flex flex-column dark-main-bg">
          <Header />
          <main>
            <Routes>
              <Route path="/single-project/:id" element={<SingleProject />} />
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" >
                <Route
                  path=""
                  element={<ProfileMain />}
                />
                <Route
                  path=":username"
                  element={<ProfileMain />}
                />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
=======
        <Header />
        <main className="App custom-height bg-secondary">
          <Routes>
            <Route path="/single-project/:id" element={<SingleProject />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<ProfileMain />} />
            <Route
              path="/profile/user-projects"
              element={<ProfileProjects />}
            />
            <Route
              path="/profile/user-comments"
              element={<ProfileComments />}
            />
            <Route
              path="/profile/friend-list"
              element={<FriendTab />}
            />
          </Routes>
        </main>
        <Footer />
>>>>>>> 96afe5b17b2b8d77c2a1b8538d1c1e83b58a60a4
      </Router>
    </ApolloProvider>
  );
}

export default App;
