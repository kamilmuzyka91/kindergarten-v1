import React, { Component } from "react";

import Form from "./Form";
import Result from "./Result";

// prywatny klucz do API [zlicza użycie API do $$]
const api_key = "265674e9afcf30fa62ae032128dae1e6";

class Weather extends Component {
  // stan początkowy

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

  // metoda handleCitySubmit zostanie wywołana w <Form onSubmit={props.handleCitySubmit}>
  // onSubmit wykona się po wysłaniu formularza [kliknięcie button] lub wciśnięciu enter w inpucie
  // w tej metodzie używamy metody fetch()
  handleCitySubmit = (e) => {
    // console.log("potwierdzony formularz");
    e.preventDefault(); // metoda blokuje domyślną akcję wysłania dzięki czemu strona się nie odświerza kiedy dane są wysłane

    const API = `http://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&appid=${api_key}&lang=pl&units=metric`;
    // response i data to dowolne nazwy
    fetch(API)
      .then((response) => {
        if (response.ok) {
          return response;
        }
        // obsługa błędu, sprawdzamy czy odpowiedź ma ststus 200 nie 404 czy 500, jeżeli tak to przekazujemy
        // nasz response dalej i tworzy się następny promise który otrzymane dane przekazuje nam
        // w postaci JSON, jeżeli status będzie z błędem przerwie się łańcuch promisów i dalsze instrukcje nie
        // zostaną wykonane i uruchomi się metoda catch()
        throw Error("Nie udało się");
      })
      .then((response) => response.json())
      // tutaj odbieramy już nasze dane w JSON pod zmienną "data", można sprawdzić dane w konsoli
      // dane mamy już odebrane więc żeby je przetworzyć nalezy przekazać je do state aby je przetworzyć
      //   .then((data) => console.log(data))
      .then((data) => {
        const time = new Date().toLocaleString();
        this.setState({
          error: false,
          // przekazujemy wybrane dane do state, data przychodzi w formie 32bitowej (ilość miliseksund od czasu unixowego)
          // więc musimy ją "przerobić" za pomocą obiektu Date() więc tworzę zmienną time, przerabiam dane i podaję zmienną
          // do setState - zmienną należy utworzyć przed metodą setState !!!

          date: time,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
          temp: data.main.temp,
          pressure: data.main.pressure,
          wind: data.wind.speed,
          feels_like: data.main.feels_like,
          city: this.state.value, // nie data.name itp, bo nazwa może być anglojęzyczna
          // stąd należy pobrać nazwę miasta z pola input ponieważ jeżeli będzie niepoprawna, zobaczymy błąd
          // aby stan był aktualny można przekazać jako parametr setState funkcję która zwraca ojekt
          // i to jest dobra praktyka ponieważ mamy pewność, że stan jest aktualny
          // .then(setState( prevState => ({
          // date: time,
          // sunrise: data.sys.sunrise,
          // sunset: data.sys.sunset,
          // temp: data.main.temp,
          // pressure: data.main.pressure,
          // wind: data.wind.speed,
          // city: prevState.value,  <------- ! wtedy odwołujemy się do prevState gdzie ta nazwa jest opcjonalna
          // przykład użycia w metodzie .catch przy obsłudze błędu
          // prevState jest nazwą dowolną lecz powrzechnie używaną ponieważ wiadomo o co chodzi czyli
          // AKTUALNY STAN KOMPONENTU - AKTUALNIE TO CO ZNAJDUJE SIĘ W STATE = {...}
          //   })))
        });
      })
      // obsługa błędu
      // jezeli mamy już obsługę błędu i zapisuje się ona w stanie lokalnym state
      //   możemy ją przekazać w props do komponentu <Result/> jako wiadomość
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

  componentDidMount() {
    console.log("Zamontowany");
    // https://www.youtube.com/watch?v=HYdy4gM6pPs&list=PLTs20Q-BTEMNlWqt1sofJj5HDDqNlZy3L&index=8
  }
  componentDidUpdate() {
    console.log("did update");
  }

  render() {
    return (
      <div>
        <Form
          value={this.state.value}
          change={this.handleInputChange}
          submit={this.handleCitySubmit}
        />
        {/* przekazanie metody pod dowolną nazwą przez props do komponentu <Form/> tutaj "change"
        ta metoda obsługuje zapisanie do stanu wartości wpisanej w input formularza z komponentu<Form/>
        tymsamym forularz staje się komponentem kontrolowanym, stan początkowy value to " "  */}
        <Result weather={this.state} />
        {/* // Do result przekazujemy cały state zmaiast osobno każdą wartość np: 
        error={this.state.error} itd ipt
         */}
      </div>
    );
  }
}

export default Weather;
