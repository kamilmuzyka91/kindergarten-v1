import React, { Component } from "react";

import Navigation from "../Navigation";
// import TodoList from "../TodoList";

class Fun extends Component {
  render() {
    return (
      <>
        <Navigation />
        <section className="have_fun">
          <h1 className="title">Lista zabaw dla dzieci</h1>
          <p>
            Podziel się zabawami dla dzieci aby ułatwić pracę wszystkim w
            zespole.
          </p>
          {/* <TodoList /> */}
        </section>
      </>
    );
  }
}

export default Fun;
