import React from "react";
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
      <>
        <Navigation />
        <div className="container">
          <div className="profile__container">
            <img
              className="profile__avatar"
              src="https://place-hold.it/150x150x"
              alt="user avatar"
            />
            <div className="profile__data">
              <p className="profile__user">Użytkownik: {authUser.username}</p>
              <p className="profile__user">E-mail: {authUser.email}</p> <br/>
              <PasswordChangeForm />
            </div>
          </div>
        </div>
      </>
    )}
  </AuthUserContext.Consumer>
);

// to samo co w homePage
const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
