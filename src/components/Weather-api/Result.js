import React from "react";

const Result = (props) => {
  const {
    date,
    sunrise,
    sunset,
    temp,
    pressure,
    wind,
    city,
    feels_like,
    error,
  } = props.weather;

  let content = null;

  if (!error && city) {
    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunSetTime = new Date(sunset * 1000).toLocaleTimeString();

    content = (
      <article className="search__results">
        <p>
          Wyniki wyszukiwania dla miasta {city} na {date}
        </p>
        <p>Aktualna temperatura to {temp} &#176;C</p>
        <p>Temperatura odczówalna {feels_like} &#176;C</p>
        <p>Ciśnienie wynosi {pressure} hPa</p>
        <p>Wiatr wieje z prędkością {wind} km/h</p>
        <p>Wschód słońca: {sunriseTime} </p>
        <p>Zachód słońca: {sunSetTime} </p>
      </article>
    );
  }

  return (
    <section className="weather">
      {error ? `Nie znaleziono ${city}, sprawdź nazwę miasta` : content} <br />
    </section>
  );
};

export default Result;