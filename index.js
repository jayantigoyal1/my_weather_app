import axios from "axios";

function displayTemperature(response) {
  // Get temperature and city from API
  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;

  // Update city name
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = city;

  // Update temperature value
  let temperatureElement = document.querySelector(".current-temperature-value");
  temperatureElement.innerHTML = temperature;
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;

  // Call SheCodes Weather API
  let apiKey = "a4c2o660020f7btfdfc6a5d36d3cc4f2"; // your API key
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateElement.innerHTML = formatDate(currentDate);
