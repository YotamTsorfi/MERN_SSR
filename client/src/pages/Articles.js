import React, { useEffect, useState } from "react";

const Articles = () => {
  //const [articles, setArticles] = useState([]);
  const [articles, setArticles] = useState(window && window.preloadedArticles);

  useEffect(() => {
    if (window && !window.preloadedArticles) {
      console.log("No preloaded articles found, loading from the server");
      fetch("/api/articles")
        .then((response) => response.json())
        .then((data) => setArticles(data));
    }
  }, []);

  return (
    <>
      <div>Articles</div>
      {articles &&
        articles.map((article) => (
          <div key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
          </div>
        ))}
    </>
  );
};

export default Articles;
