import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Landing } from "./pages/Landing";
import "./styles/global.css";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <Landing />
  </StrictMode>,
);
