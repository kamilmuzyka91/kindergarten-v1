import { BrowserRouter as Router, Route } from "react-router-dom";

import LandingPage from "../Landing";
import SignInPage from "../SignIn";
import SignUpPage from "../SignUp";
import PasswordForgetPage from "../PasswordForget";
import HomePage from "../Home";
import AccountPage from "../Account";
import AdminPage from "../Admin";
import Chat from "../Chat";

import * as ROUTES from "../../constants/routes";
import { withAuthentication } from "../Session";

const App = () => (
  <Router>
    <>
      {/* authorization routes */}
      <Route exact path={ROUTES.LANDING} component={LandingPage} />
      <Route path={ROUTES.SIGN_UP} component={SignUpPage} />
      <Route path={ROUTES.SIGN_IN} component={SignInPage} />
      <Route path={ROUTES.PASSWORD_FORGET} component={PasswordForgetPage} />

      {/* withAuthentication */}
      <Route exact path={ROUTES.HOME} component={HomePage} />
      <Route path={ROUTES.ADMIN} component={AdminPage} />
      <Route path={ROUTES.ACCOUNT} component={AccountPage} />
      <Route path={ROUTES.CHAT} component={Chat} />
    </>
  </Router>
);

export default withAuthentication(App);
