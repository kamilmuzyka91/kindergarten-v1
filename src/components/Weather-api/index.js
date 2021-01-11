import React, { Component } from "react";

import Form from "./Form";
import Result from "./Result";

const api_key = "265674e9afcf30fa62ae032128dae1e6";

class Weather extends Component {
  state = {
    value: "",
    date: "",
    city: "",
    sunrise: "",
    sunset: "",
    temp: "",
    pressure: "",
    wind: "",
    feels_like: "",
    error: false,
  };

  handleInputChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  handleCitySubmit = (e) => {
    e.preventDefault();

    const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${api_key}&lang=pl&units=metric`;

    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        throw Error("Nie udało się");
      })
      .then((response) => response.json())
      .then((data) => {
        const time = new Date().toLocaleString();
        this.setState({
          error: false,
          date: time,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          feels_like: data.main.feels_like,
          city: this.state.value,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState((prevState) => {
          return {
            error: true,
            city: prevState.value,
          };
        });
      });
  };

  render() {
    return (
      <>
        <Form
          value={this.state.value}
          change={this.handleInputChange}
          submit={this.handleCitySubmit}
        />
        <Result weather={this.state} />
      </>
    );
  }
}

export default Weather;
