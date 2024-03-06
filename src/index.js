import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";

import store from "./rootStore";
import { Provider } from "react-redux";

import "react-tooltip/dist/react-tooltip.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const root = ReactDOM.createRoot(document.getElementById("root"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <React.Fragment>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.Fragment>
);
