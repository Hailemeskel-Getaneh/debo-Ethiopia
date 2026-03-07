import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./App.tsx";
import { ErrorBoundary } from "react-error-boundary";
import {
  AppCrashFrame,
  //  SimulateError
} from "@/components";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary
      FallbackComponent={AppCrashFrame}
      onReset={() => globalThis.location.reload()}
    >
      {/* <SimulateError /> */}
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
