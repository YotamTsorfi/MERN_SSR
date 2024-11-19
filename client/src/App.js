import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import styled from "styled-components";

const BigGreenHeading = styled.h1`
  color: green;
  font-size: 96px;
`;

const App = () => {
  return (
    <>
      <BigGreenHeading>App</BigGreenHeading>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="Articles">Articles</Link>
        </li>
      </ul>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/articles" element={<Articles />} />
      </Routes>
    </>
  );
};

export default App;
