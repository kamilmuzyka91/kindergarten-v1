import React from "react";

import { withAuthorization } from "../Session";
import Navigation from "../Navigation";

const HomePage = () => (
  <div>
    <Navigation />
    <h1>Home Page</h1>
    <br />
    <p>Home Page jest dostępna dla wszystkich zarejestrowanych użytkowników</p>
    <br />
    <br />
    <section className="list">
      <article className="kids_games">img gry</article>
      <article className="kids_order">img zamówienia</article>
      <article className="kids_complaints">img skargi</article>
      <article className="kids_plans">img plany</article>
    </section>
  </div>
);
//  warunek autoryzacji, tylko zalogowany użytkownik może zobaczyć homePage (nie tylko autoryzowany admin - każdy user)
const condition = (authUser) => !!authUser;

export default withAuthorization(condition)(HomePage);
