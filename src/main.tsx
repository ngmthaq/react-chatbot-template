import { RouterProvider, createRouter } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";
import { routeTree } from "./routeTree.gen";

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

declare global {
  interface Window {
    __ENV__: Record<string, string>;
  }
}

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />,
);
