import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";
import "bootstrap/dist/css/bootstrap.min.css";

// Soft UI Dashboard React Context Provider
import { SoftUIControllerProvider } from "context";
import { ToastProvider } from "react-toast-notifications";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { AuthProvider, initialAuthState, authReducer } from "context/auth-context";

const client = new ApolloClient({
  uri: "https://snapoffer-a69f05cdbe71.herokuapp.com/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <SoftUIControllerProvider>
        <ToastProvider>
          <AuthProvider initialState={initialAuthState} reducer={authReducer}>
            <App />
          </AuthProvider>
        </ToastProvider>
      </SoftUIControllerProvider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
