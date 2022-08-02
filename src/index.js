import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import "./index.css";

import { FronteggProvider } from "@frontegg/react";
import { BrowserRouter } from "react-router-dom";

// const contextOptions = {
//   baseUrl: "https://devsuccan.frontegg.com",
// };

const authOptions = {
  // routes: {
  //   authenticatedUrl: "myurl.com/route",
  //   login: "hello",
  // },
  // keepSessionAlive: true
};

const contextOptions = {
  baseUrl: "https://app-xjzoc9dcjhc1.frontegg.com",
  clientId: "2a5142df-3375-4632-a9a8-4b8580ce8009",
};

const localizations = {
  en: { adminPortal: {users_InviteUser: {cancel: 'Close'}}},
};
const themeOptions = {
  adminPortal: {
    pages: {
      users: {
        hideInviteWithEmail: true,
      },
    },
  },
};

ReactDOM.render(
  <BrowserRouter>
    <FronteggProvider
      contextOptions={contextOptions}
      themeOptions={themeOptions}
      hostedLoginBox={true}
      localizations={localizations}
    >
      <App />
    </FronteggProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
