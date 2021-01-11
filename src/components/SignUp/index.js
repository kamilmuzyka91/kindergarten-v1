import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";
import * as ROLES from "../../constants/roles";

import akacjoweLogo from "../../Assets/akacjoweLogo.png";

const SignUpPage = () => (
  <section className="signUp__container">
    <img className="logo" src={akacjoweLogo} alt="Akacjowe przedszkole" />
    <SignUpForm />
  </section>
);

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  kindergartenWorker: false,
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { username, email, passwordOne, kindergartenWorker } = this.state;
    const roles = {};

    if (kindergartenWorker) {
      roles[ROLES.ADMIN_DENIED] = ROLES.ADMIN_DENIED;
    }

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then((authUser) => {
        // Create a user in your Firebase realtime database
        return this.props.firebase.user(authUser.user.uid).set({
          username,
          email,
          roles,
        });
      })
      .then(() => {
        return this.props.firebase.doSendEmailVerification();
      })
      .then((authUser) => {
        this.setState({ ...INITIAL_STATE });
        // przekirowanie usera po poprwnym zalogowaniu do /home - ptotect route
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });
    console.log(username);
    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onChangeCheckbox = (event) => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      kindergartenWorker,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <form className="form" onSubmit={this.onSubmit}>
        <input
          className="input__label"
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Imię"
        />
        <input
          className="input__label"
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="akacjowe@przedszkole.pl"
        />
        <input
          className="input__label"
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Hasło"
        />
        <input
          className="input__label"
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Powtórz hasło"
        />

        <label className="checkbox">
          <input
            className="checkbox"
            name="kindergartenWorker"
            type="checkbox"
            checked={kindergartenWorker}
            onChange={this.onChangeCheckbox}
          />
          <span></span>
          <p className="worker__checkbox">Jestem pracownikiem przedszkola</p>
        </label>

        <button className="register__btn" disabled={isInvalid} type="submit">
          Rejestracja
        </button>

        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <p className="help_link">
    <Link to={ROUTES.SIGN_UP}>Nie mam konta</Link>
  </p>
);

const SignUpForm = withRouter(withFirebase(SignUpFormBase));

export default SignUpPage;

export { SignUpForm, SignUpLink };
