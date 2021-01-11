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
    // czas pobrany z API jako sunrise/set jest w milisekundach od czasu uniksowego
    // metoda toLocaleTimeString() utworzy z niego prawidłową godzinę w formacie HH:MM:SS

    const sunriseTime = new Date(sunrise * 1000).toLocaleTimeString();
    const sunSetTime = new Date(sunset * 1000).toLocaleTimeString();

    content = (
      <article className="if">
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
      {/* {error ? true : false} - struktura operatora trójargumentowego */}
      {/* content na początku jest zapiany w zmiennej jako null, a co ma się dziać wyznacza 
      instrukcja warunkowa if czyli: jeżeli error jest false oraz city nie jest "pusty string" nadpisz
      zmienną content i wstaw tam np div'a .... lub coś innego 
      zmienną content można nadpisać ponieważ jest to zmienna let nie const  */}
      {error ? `Nie znaleziono ${city}, sprawdź nazwę miasta` : content} <br />
    </section>
  );
};

export default Result;

// lub:

// const Result = ({ ...props }) => {
//   return <div className="">{String(props.weather.error)}</div>;
// };
