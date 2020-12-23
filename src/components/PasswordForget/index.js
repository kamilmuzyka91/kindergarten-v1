import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

const PasswordForgetPage = () => (
  <>
    <h1 className="forget_title">Zapomniane hasło</h1>
    <PasswordForgetForm />
  </>
);

const INITIAL_STATE = {
  email: "",
  error: null,
};

class PasswordForgetFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = (event) => {
    const { email } = this.state;

    this.props.firebase
      .doPasswordReset(email)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
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
    const { email, error } = this.state;

    const isInvalid = email === "";

    return (
      <form className="forget_form" onSubmit={this.onSubmit}>
        Zapomniałem hasła:
        <input
          className="forget_input"
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="jan@kowalski.pl"
        />
        <button className="reset_btn" disabled={isInvalid} type="submit">
          Resetuj hasło
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const PasswordForgetLink = () => (
  <p className="help_link">
    <Link to={ROUTES.PASSWORD_FORGET}>Nie pamiętam hasła</Link>
  </p>
);

export default PasswordForgetPage;

const PasswordForgetForm = withFirebase(PasswordForgetFormBase);

export { PasswordForgetForm, PasswordForgetLink };
