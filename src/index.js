import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <link rel="stylesheet" href="https://unpkg.com/mvp.css" />
    <App />
  </React.StrictMode>
);
