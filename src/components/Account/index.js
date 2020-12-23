import React from "react";

import { PasswordForgetForm } from "../PasswordForget";
import PasswordChangeForm from "../PasswordChange";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";
import { compose } from "recompose";
import Navigation from "../Navigation";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <div>
        <Navigation />
        <h1>
          Zalogowany: {authUser.username} {authUser.email}
        </h1>
        <PasswordForgetForm />
        <PasswordChangeForm />
      </div>
    )}
  </AuthUserContext.Consumer>
);

// to samo co w homePage
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
