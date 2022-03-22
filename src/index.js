import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";

import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "https://snapoffers.herokuapp.com/",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <SoftUIControllerProvider>
        <App />
      </SoftUIControllerProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
