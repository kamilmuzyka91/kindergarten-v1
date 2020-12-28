import React from "react";

import { withAuthorization } from "../Session";

import Navigation from "../Navigation";

const HomePage = () => (
  <>
    <Navigation />

    <div className="home">
      <h1>wdvwevwevwevwev</h1>
      <p className="lorem"> lorem</p>
    </div>
  </>
);
//  warunek autoryzacji, tylko zalogowany użytkownik może zobaczyć homePage (nie tylko autoryzowany admin - każdy user)
const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
