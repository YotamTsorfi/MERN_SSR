import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

const dataElement = document.getElementById("app_data");
const data = dataElement ? JSON.parse(dataElement.textContent) : null;

console.log("Initial data from server:", data);

const rootElement = document.getElementById("root");
const root = ReactDOM.hydrateRoot(
  rootElement,
  <BrowserRouter>
    <App initialData={data} />
  </BrowserRouter>
);

// Support for Hot Module Replacement (HMR)
if (module.hot) {
  module.hot.accept("./App", () => {
    const NextApp = require("./App").default;
    root.render(
      <BrowserRouter>
        <NextApp initialData={data} />
      </BrowserRouter>
    );
  });
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
