import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

import { SignUpLink } from "../SignUp";
import { PasswordForgetLink } from "../PasswordForget";
import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

import akacjoweLogo from "../../Assets/akacjoweLogo.png";

const SignInPage = () => (
  <div className="signIn__container">
    <img className="logo" src={akacjoweLogo} alt="Akacjowe przedszkole" />
    <SignInForm />
    <PasswordForgetLink />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch((error) => {
        this.setState({ error });
      });

    event.preventDefault();
  };

  onChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === "" || email === "";

    return (
     
      <form className="form" onSubmit={this.onSubmit}>
        {/* <p className="input__name"> E-mail:</p> */}
        <input
          className="input__label"
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="akacjowe@przedszkole.pl"
        />
        <br />
        {/* <p className="input__name"> Hasło:</p> */}
        <input
          className="input__label"
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Hasło"
        />
        <br />
        <button className="send__btn" disabled={isInvalid} type="submit">
          Zaloguj
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignInForm = compose(withRouter, withFirebase)(SignInFormBase);

export default SignInPage;

export { SignInForm };
