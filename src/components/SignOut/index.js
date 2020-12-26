import React from "react";

import { withFirebase } from "../Firebase";

const SignOutButton = ({ firebase }) => (
  <button className="sign_out_btn" type="button" onClick={firebase.doSignOut}>
    Wyloguj mnie
  </button>
);

export default withFirebase(SignOutButton);
