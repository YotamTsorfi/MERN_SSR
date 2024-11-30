require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
});

import express from "express";
import React from "react";
import { renderToString } from "react-dom/server";
import path from "node:path";
import { StaticRouter } from "react-router-dom/server";

import App from "../client/src/App";

// Define global.window only if it is not already defined
if (typeof global.window === "undefined") {
  global.window = {};
}

const app = express();

app.use(
  express.static(path.resolve(__dirname, "../../client/build"), {
    index: false,
  })
);

app.use(
  "/favicon.ico",
  express.static(path.join(__dirname, "../../client/public", "favicon.ico"))
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
  const context = {};
  const reactApp = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App initialData={articles} />
    </StaticRouter>
  );

  // Check if a redirect occurred during rendering
  if (context.url) {
    return res.redirect(301, context.url);
  }

  // Set the status code based on the context
  const status = context.statusCode || 200;

  return res.status(status).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Job Finder</title>
        <link rel="icon" href="/favicon.ico">
        <script type="application/json" id="app_data">${JSON.stringify(
          articles
        )}</script>
      </head>
      <body>
        <div id="root">${reactApp}</div>
        <script>
          window.__INITIAL_DATA__ = ${JSON.stringify(articles)};
        </script>
        <script src="/bundle.js"></script>
      </body>
      </html>
    `);
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
