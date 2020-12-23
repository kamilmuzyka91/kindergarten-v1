import React from "react";
import SignInPage from "../SignIn";
import akacjoweLogo from "../../Assets/akacjoweLogo.png";

const Landing = () => (
  <section className="landingPage">
    <img className="logo" src={akacjoweLogo} alt="logo" />
    <SignInPage />
  </section>
);

export default Landing;
