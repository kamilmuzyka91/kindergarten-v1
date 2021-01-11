import React from "react";

const Form = (props) => {
  return (
    <section className="weather">
      <form onSubmit={props.submit}>
        <i className="weather-icon fas fa-temperature-low"></i>
        <input
          type="text"
          value={props.value}
          placeholder="wpisz miasto"
          onChange={props.change}
        />
        <button>Sprawdź pogodę</button>
      </form>
    </section>
  );
};

export default Form;
