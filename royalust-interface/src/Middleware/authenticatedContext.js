import React from "react";

// set the defaults
const AuthenticatedContext = React.createContext({
  autheticated: null,
  setAuthenticated: () => {}
});

export default AuthenticatedContext;
