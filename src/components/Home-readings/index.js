import React, { Component } from "react";

import Navigation from "../Navigation";

class Readings extends Component {
  render() {
    return (
      <>
        <Navigation />
        <section className="readings">
          <h1 className="title">Tytuł czytanki</h1>
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

export default Readings;
