// Split Signal reminder: keep the entry point minimal so the design system and page shell remain the source of truth.
import React from "react";
import ReactDOM from "react-dom/client";
import App from "@/App";
import "@/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
