import { format } from "date-fns";

class Weather {
  constructor() {
    this.isFahr = true;
    this.currentCity = "";
  }

  setFahr = () => {
    this.isFahr ? (this.isFahr = false) : (this.isFahr = true);
  };

  getWeather = (city) => {
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=cc60e942151b4a0d8e741120232804&q=${city}&aqi=no`
    )
      .then((res) => {
        if (res) {
          return res.json();
        }
      })
      .then((data) => {
        this.currentCity = data.location.name;

        let resErr = document.querySelector(".error");
        resErr.style.display = "none";

        this.renderText(
          document.querySelector(".weather-type"),
          data.current.condition.text
        );

        this.renderText(
          document.querySelector(".city-name"),
          data.location.name
        );

        this.renderText(
          document.querySelector(".temp-val"),
          this.isFahr ? data.current.temp_f : data.current.temp_c
        );

        this.renderText(
          document.querySelector(".date"),
          format(new Date(data.location.localtime), "EEEE, do MMMM yy'")
        );

        this.renderText(
          document.querySelector(".time"),
          format(new Date(data.location.localtime), "h:m aaa")
        );

        this.renderText(
          document.querySelector(".fl-val"),
          this.isFahr ? data.current.feelslike_f : data.current.feelslike_c
        );

        this.renderText(
          document.querySelector(".h-val"),
          data.current.humidity
        );

        this.renderText(
          document.querySelector(".ws-val"),
          data.current.wind_mph
        );

        this.renderImage(
          document.querySelector(".weather-type-image"),
          data.current.condition.icon
        );

        this.isFahr
          ? this.renderAll(document.querySelectorAll(".foc"), "F")
          : this.renderAll(document.querySelectorAll(".foc"), "C");
      });
  };

  getForecast = (city) => {
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=cc60e942151b4a0d8e741120232804&q=${city}&days=9&aqi=no&alerts=no`
    )
      .then((res) => {
        if (res) {
          return res.json();
        }
      })
      .then((data) => {
        let error = document.querySelector(".error");

        this.renderText(
          document.querySelector(".cr-val"),
          data.forecast.forecastday[0].day.daily_chance_of_rain
        );

        const forcast = document.querySelector(".forcast-container");
        forcast.innerHTML = "";
        data.forecast.forecastday.slice(2).forEach((element) => {
          let newItem = document.createElement("div");
          newItem.insertAdjacentHTML(
            "beforeend",
            `<p class="forcast-date">${format(
              new Date(element.date),
              "EEEE"
            )}</p>
            <p class="forcast-temp">${
              this.isFahr ? element.day.avgtemp_f : element.day.avgtemp_c
            } º${this.isFahr ? "F" : "C"}</p>
            <img src=${element.day.condition.icon}>
            `
          );
          forcast.appendChild(newItem);
        });
      })
      .catch(() => {
        let error = document.querySelector(".error");
        error.style.display = "initial";
      });
  };

  getAllWeather = (city) => {
    this.getForecast(city);
    this.getWeather(city);
  };

  renderText = (element, text) => {
    element.textContent = text;
  };

  renderAll = (elements, text) => {
    elements.forEach((ele) => {
      ele.textContent = text;
    });
  };

  renderImage = (element, newSrc) => {
    element.src = newSrc;
  };
}

const cityInput = document.querySelector(".city-input");
const inputButton = document.querySelector(".ipt-btn");
const displayType = document.querySelector(".display-type");

let test = new Weather();
test.getAllWeather("Chesterton");

inputButton.addEventListener("click", () => {
  test.getAllWeather(cityInput.value);
});

displayType.addEventListener("click", () => {
  test.setFahr();
  displayType.textContent = test.isFahr ? "Display ºC" : "Display ºF";
  test.getAllWeather(test.currentCity);
});
