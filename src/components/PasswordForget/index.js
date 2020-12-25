import React, { Component } from "react";
import { Link } from "react-router-dom";

import { withFirebase } from "../Firebase";
import * as ROUTES from "../../constants/routes";

import akacjoweLogo from "../../Assets/akacjoweLogo.png";

const PasswordForgetPage = () => (
  <section className="passwd-forget">
    <img className="logo" src={akacjoweLogo} alt="Akacjowe przedszkole logo" />
    <h3 className="forget_title">Aby zresetować hasło wpisz adres e-mail i sprawdz skrzynkę pocztową.</h3>
    <PasswordForgetForm />
  </section>
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
      <form className="form" onSubmit={this.onSubmit}>
        
        <input
          className="input__label"
          name="email"
          value={this.state.email}
          onChange={this.onChange}
          type="text"
          placeholder="akacjowe@przedszkole.pl"
        />
        <button className="reset__btn" disabled={isInvalid} type="submit">
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
