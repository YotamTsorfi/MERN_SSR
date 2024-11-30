import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import styled from "styled-components";

const BigGreenHeading = styled.h1`
  color: green;
  font-size: 96px;
`;

const App = ({ initialData }) => {
  const [articles, setArticles] = useState(initialData || []);

  useEffect(() => {
    if (!initialData) {
      fetch("/api/articles")
        .then((response) => response.json())
        .then((data) => {
          console.log("Fetched articles:", data);
          setArticles(data);
        })
        .catch((error) => console.error("Error fetching articles:", error));
    }
  }, [initialData]);

  return (
    <>
      <BigGreenHeading>Job Finder</BigGreenHeading>
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
        <Route path="/articles" element={<Articles articles={articles} />} />
      </Routes>
    </>
  );
};

export default App;
