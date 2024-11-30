import React from "react";

const Articles = ({ articles }) => {
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
