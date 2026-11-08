import React from "react";
import ReactDOM from "react-dom/client";
import { MotionConfig } from "framer-motion";
import App from "./App";
import { PrefsProvider } from "./context/Prefs";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrefsProvider>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </PrefsProvider>
  </React.StrictMode>
);
