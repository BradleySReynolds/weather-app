import moment, { format } from "moment";
import { tz } from "moment-timezone";
import { apiKey } from "./config";

document.cookie = "SameSite=None";

class Weather {
  constructor() {
    this.isFahr = true;
    this.currentCity = "";
    this.timeZone = "";
    this.timer = "";
  }

  setFahr = () => {
    this.isFahr ? (this.isFahr = false) : (this.isFahr = true);
  };

  getWeather = (city) => {
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}&aqi=no`
    )
      .then((res) => {
        if (res) {
          return res.json();
        }
      })
      .then((data) => {
        this.currentCity = data.location.name;
        this.timeZone = data.location.tz_id;

        let resErr = document.querySelector(".error");
        resErr.style.display = "none";

        this.timer = setInterval(() => {
          this.renderText(
            document.querySelector(".time"),
            moment().tz(this.timeZone).format("hh:mm:ss a")
          );
        }, 1000);

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
          moment(data.location.localtime).format("dddd, MMM Do YYYY")
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
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=9`
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
        data.forecast.forecastday.forEach((element) => {
          let newItem = document.createElement("div");
          newItem.insertAdjacentHTML(
            "beforeend",
            `<p class="forcast-date">${moment(element.date).format("DD-MM")}</p>
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
  clearInterval(test.timer);
});

displayType.addEventListener("click", () => {
  test.setFahr();
  displayType.textContent = test.isFahr ? "Display ºC" : "Display ºF";
  test.getAllWeather(test.currentCity);
});
