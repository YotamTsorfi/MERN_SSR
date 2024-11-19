require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import path from "path";
import fs from "fs";
import { StaticRouter } from "react-router-dom/server";

import App from "../client/src/App";

global.window = {};

const app = express();

app.use(express.static(path.resolve(__dirname, "../../client/build")));

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
  const filePath = path.resolve(__dirname, "../../client/build", "index.html");
  fs.readFile(filePath, "utf8", (err, htmlData) => {
    if (err) {
      console.error("Could not read index.html file", err);
      return res.status(500).send("Error reading index.html");
    }

    const reactApp = renderToString(
      <StaticRouter location={req.url}>
        <App />
      </StaticRouter>
    );

    const loadedArticles = articles;

    return res.send(
      htmlData.replace(
        '<div id="root"></div>',
        `<script>window.preloadedArticles = ${JSON.stringify(
          loadedArticles
        )}</script>`,
        `<div id="root">${reactApp}</div>`
      )
    );
  });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
