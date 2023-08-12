# Weather App

Welcome to the Weather App! This application fetches and displays current weather and forecast data for a given city using the WeatherAPI. Users can toggle between Fahrenheit and Celsius temperature units and view updated weather information in real-time.

## Table of Contents

- [Overview](#overview)
- [Getting Started](#getting-started)
- - [Prerequisites](#prerequisites)
- - [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)

## Overview

The Weather App is a web application built to provide users with up-to-date weather information for a specific city. It fetches data from the WeatherAPI to display the current weather conditions, including temperature, weather type, humidity, wind speed, and more. Additionally, the app shows a 9-day forecast for the selected city.

## Getting Started

### Prerequisites

- A modern web browser or Node.js environment to run the application.
- Obtain an API key from [WeatherAPI](https://www.weatherapi.com/) to access weather data.

### Installation

1. Clone this repository to your local machine:

   ```bash
   git clone https://github.com/bradleysreynolds/weather-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd weather-app
   ```

3. Create a config.js file in the root directory and add your WeatherAPI key:

   ```bash
   cd weather-app
   ```

4. Open the `index.html` file in a web browser or run the script using Node.js:

   ```bash
   node main.js
   ```

### Usage

1. Open the application in your preferred environment.
2. By default, the application fetches weather data for the city "Chesterton."
3. To fetch weather data for a different city:
   - Enter the city name in the input field.
   - Click the "Get Weather" button.
   - The application will display current weather and forecast data for the selected city.
4. Toggle between Fahrenheit and Celsius temperature units by clicking the "Display ºC" or "Display ºF" button.

### Features

- Real-time display of current weather conditions and 9-day forecast.
- Toggle between Fahrenheit and Celsius temperature units.
- Automatic time updates for the selected city's timezone.
- Responsive design for various screen sizes.

### Contributing

Contributions to the Weather App are welcome! If you encounter issues, have ideas for improvements, or want to add new features, please feel free to open an issue or submit a pull request. Before contributing, ensure that your code follows the project's coding style and conventions.
