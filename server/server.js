require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import path from "node:path";
import fs from "node:fs";
import { StaticRouter } from "react-router-dom/server";

import App from "../client/src/App";

global.window = {};

const app = express();

app.use(
  express.static(path.resolve(__dirname, "../../client/build"), {
    index: false,
  })
);

const articles = [
  { id: 1, title: "First Article", content: "Hello from the first article" },
  { id: 2, title: "Second Article", content: "Hello from the second article" },
  { id: 3, title: "Third Article", content: "Hello from the third article" },
];

app.get("/api/articles", (req, res) => {
  const loadedArticles = articles;
  res.json(loadedArticles);
});

app.get("/*", (req, res) => {
  const reactApp = renderToString(
    <StaticRouter location={req.url}>
      <App />
    </StaticRouter>
  );

  const loadedArticles = articles;
  console.log("TEST", loadedArticles);

  // Placing the Articles data in the HTML and having the
  // React app rendering it after it's get to the client
  return res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>My App 2</title>
      </head>
      <body>
        <div id="root">${reactApp}</div>
        <script type="application/json" id="app_data">${JSON.stringify(
          loadedArticles
        )}</script>
        <script>
          window.__INITIAL_DATA__ = ${JSON.stringify(loadedArticles)};
        </script>
      </body>
      </html>
    `);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
