import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App";

const qc = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: Infinity },
    mutations: { retry: 1 },
  },
});

createRoot(document.getElementById("root") as Element).render(
  <StrictMode>
    <QueryClientProvider client={qc}>
      <App />
      <ReactQueryDevtools />
    </QueryClientProvider>
  </StrictMode>,
);
