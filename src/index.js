// Import the necessary libraries and modules
import moment from "moment"; // For working with dates and times
import { apiKey } from "./config"; // Import the API key from a config file

// Set SameSite cookie attribute to "None" to handle cross-site requests
document.cookie = "SameSite=None";

// Define the Weather class
class Weather {
  constructor() {
    // Initialize weather-related properties
    this.isFahr = true; // Toggle between Fahrenheit and Celsius
    this.currentCity = ""; // Store the currently selected city
    this.timeZone = ""; // Store the timezone for the city
    this.timer = ""; // Store the timer for updating time
  }

  // Method to toggle between Fahrenheit and Celsius
  setFahr = () => {
    this.isFahr ? (this.isFahr = false) : (this.isFahr = true);
  };

  // Method to fetch current weather data for a given city
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
        // Extract relevant data from the API response
        this.currentCity = data.location.name;
        this.timeZone = data.location.tz_id;

        // Hide error message
        let resErr = document.querySelector(".error");
        resErr.style.display = "none";

        // Update the time every second using setInterval
        this.timer = setInterval(() => {
          this.renderText(
            document.querySelector(".time"),
            moment().tz(this.timeZone).format("hh:mm:ss a")
          );
        }, 1000);

        // Update various UI elements with weather data
        this.renderText(
          document.querySelector(".weather-type"),
          data.current.condition.text
        );
        // ... (other UI elements)

        // Apply temperature unit to all relevant elements
        this.isFahr
          ? this.renderAll(document.querySelectorAll(".foc"), "F")
          : this.renderAll(document.querySelectorAll(".foc"), "C");
      });
  };

  // ... (Other methods for fetching forecast, rendering text, images, etc.)

  // Method to fetch both current weather and forecast data for a city
  getAllWeather = (city) => {
    this.getForecast(city);
    this.getWeather(city);
  };

  // ... (Other methods)
}

// DOM Elements
const cityInput = document.querySelector(".city-input");
const inputButton = document.querySelector(".ipt-btn");
const displayType = document.querySelector(".display-type");

// Create a new Weather instance
let test = new Weather();

// Fetch weather data for the initial city ("Chesterton")
test.getAllWeather("Chesterton");

// Event listener for input button click
inputButton.addEventListener("click", () => {
  test.getAllWeather(cityInput.value);
  clearInterval(test.timer); // Clear the interval to update time
});

// Event listener for display type toggle
displayType.addEventListener("click", () => {
  test.setFahr();
  displayType.textContent = test.isFahr ? "Display ºC" : "Display ºF";
  test.getAllWeather(test.currentCity);
});
