import React from "react";
import PasswordChangeForm from "../PasswordChange";
import {
  AuthUserContext,
  withAuthorization,
  withEmailVerification,
} from "../Session";
import { compose } from "recompose";
import Navigation from "../Navigation";
import Weather from "../Weather-api";

const AccountPage = () => (
  <AuthUserContext.Consumer>
    {(authUser) => (
      <>
        <Navigation />
        <section className="user__profile ">
          <div className="profile__container">
            <img
              className="profile__avatar"
              src="https://place-hold.it/150x150x"
              alt="user avatar"
            />
            <div className="profile__data">
              <p className="profile__user">Użytkownik: {authUser.username}</p>
              <p className="profile__user">E-mail: {authUser.email}</p> <br />
              <PasswordChangeForm />
            </div>
          </div>

          <Weather />
        </section>
      </>
    )}
  </AuthUserContext.Consumer>
);

const condition = (authUser) => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(AccountPage);
