import React from "react";
import { createRoot } from "react-dom/client";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import App from "./App.jsx";
import RootErrorBoundary from "./components/RootErrorBoundary.jsx";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RootErrorBoundary>
      <App />
    </RootErrorBoundary>
  </React.StrictMode>,
);
// Codex-Fix: Keep the portfolio as a lean single-page React 19 tree; hash navigation does not need router runtime.
