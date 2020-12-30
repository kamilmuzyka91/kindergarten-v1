import React, { Component } from "react";

import Navigation from "../Navigation";

class Fun extends Component {
  render() {
    return (
      <>
        <Navigation />
        <section className="have_fun">
          <h1 className="title">Tytuł zabawy</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam
            distinctio numquam, nostrum sunt dicta provident cumque nesciunt
            perferendis tempore ad voluptate deserunt porro, dolorem, voluptates
            necessitatibus totam aliquam ex error.
          </p>
        </section>
      </>
    );
  }
}

export default Fun;
