import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

// src/mocks/browser.js
import { setupWorker } from "msw/browser";
import { HttpResponse, graphql } from "msw";

export const handlers = [
  graphql.query("GetUser", ({ variables }) => {
    const { userId } = variables;

    console.log("Fetching user with ID:", userId);

    return HttpResponse.json({
      data: {
        user: {
          name: "John",
        },
      },
    });
  }),
];

async function prepare() {
  const worker = setupWorker(...handlers);
  return worker.start();
}

prepare().then(() => {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
