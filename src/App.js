import React, { useEffect } from "react";
import {
  useAuth,
  AdminPortal,
  useAuthActions,
  useAuthUser,
  useApiTokensState,
  useAuthTeamState,
  useApiTokensActions,
  useTenantsState,
  AuthorizedContent,
  useAuthTeamActions,
  useAuditsActions,
  useLoginWithRedirect,
} from "@frontegg/react";
import { Redirect, Route, Switch, useHistory } from "react-router-dom";

import { ContextHolder } from "@frontegg/rest-api";
import { Link } from "react-router-dom";

function App() {

  const { isAuthenticated, user } = useAuth();
  const {
    loadApiTokens,
    logout,
    loadUsers,
    switchTenant,
    loadTenants,
    requestAuthorize,
    silentLogout,
    signUpUser,
    updateUser,
    // preLogin,
  } = useAuthActions();
  const { loadAuditLogs } = useAuditsActions();
  const { users } = useAuthTeamState();
  const loginWithRedirect = useLoginWithRedirect();

  // useEffect(() => {
  //   return () => {
  //     loginWithRedirect();
  //   };
  // }, [loginWithRedirect]);

  const handleClick = () => {
    // console.log(user)
    AdminPortal.show();
  };
  const { tenants } = useTenantsState();

  const switchUserTenant = () => {
    switchTenant({ tenantId: "tenant_3" });
    // loadUsers({pageOffset: 50},() => {})
    // loadTenants(() => {console.log('done')})
  };

  const signUp = () => {
    signUpUser({
      email: "person@email.com",
      password: "12345",
      companyName: "cool Company",
    });
  };

  const handleLogout = () => {
    window.location.href =
      "https://app-xjzoc9dcjhc1.frontegg.com/oauth/account/logout";
    // silentLogout();
  };

  const newLogout = () => {
    const baseUrl = ContextHolder.getContext().baseUrl;
    window.location.href = `${baseUrl}/oauth/logout?post_logout_redirect_uri=${window.location}`;
  };

  const history = useHistory();

  const routeChange = () => {
    let path = `/route`;
    history.push(path);
    // console.log(tenants)
  };

  const updateAUser = () => {
    loadUsers({ silentLoading: false });

    const { id, email } = user;
    // const roleIds = user.roles.map(r => r.id)
    updateUser({
      id,
      email: "masha.pavlotsky@frontegg.com",
      name: "new name",
      roleIds: ["a1c7804e-3b99-4ea1-b491-7aef3de449ec"],
      callback: (newUser, error) => {
        console.log(newUser, error);
      },
    });
  };

  const { preLogin } = useAuthActions();

  const preLoginTime = () => {
    preLogin({ email: "hunter@moabet.com"});
  };

  return (
    <Switch>
      <Route path="/" exact>
        <div className="App">
          {isAuthenticated && (
            <div>
              <img src={user.profilePictureUrl} alt={user.name} />
              <div>{user.tenantId}</div>
              <span>{user.name}</span>
              <div>
                <button onClick={handleClick}>Settings</button>
              </div>
              <div>
                <button onClick={switchUserTenant}>Switch Tenant</button>
              </div>
              <div>
                <button onClick={updateAUser}>Update User</button>
              </div>
              <button>
                <Link to="/route">Route</Link>
              </button>
              <button>
                <Link to="/rando">Rando</Link>
              </button>
              {/* <AuthorizedContent requiredRoles={["Admin"]}><div>Hellooooo</div></AuthorizedContent> */}
              <button onClick={newLogout}>Logout</button>
            </div>
          )}
          {!isAuthenticated && (
            <div>
              <button onClick={preLoginTime}>SSO Prelogin</button>
              <button onClick={loginWithRedirect}>Login</button>
            </div>
          )}
        </div>
      </Route>
      <Route path="/route" exact>
        <div>Hellllooooo</div>
        <button>
          <Link to="/">Return home</Link>
        </button>
      </Route>
      <Route path="*">
        <div>Route not found!</div>
      </Route>
    </Switch>
  );
}

export default App;
