import React, { Component } from "react";

import Navigation from "../Navigation";

class Works extends Component {
  render() {
    return (
      <>
        <Navigation />
        <section className="works">
          <h1 className="title">Tytuł zadania</h1>
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

export default Works;
