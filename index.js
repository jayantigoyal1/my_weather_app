function displayTemperature(response) {
  console.log("Raw API response:", response);

  if (!response.data || !response.data.temperature) {
    console.error("Unexpected API response format");
    return;
  }

  let temperature = Math.round(response.data.temperature.current);
  let city = response.data.city;

  console.log(`Updating city to ${city} and temperature to ${temperature}`);

  const cityEl = document.querySelector("#current-city");
  const tempEl = document.querySelector(".current-temperature-value");

  if (!cityEl) console.error("City element not found!");
  if (!tempEl) console.error("Temperature element not found!");

  cityEl.innerHTML = city;
  tempEl.innerHTML = temperature;
}


function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();
  if (!city) return; // ignore empty searches
  getWeather(city);
}

function getWeather(city) {
  let apiKey = "a4c2o660020f7btfdfc6a5d36d3cc4f2"; 
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;

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

document.addEventListener("DOMContentLoaded", () => {
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);

  let currentDateElement = document.querySelector("#current-date");
  let currentDate = new Date();
  currentDateElement.innerHTML = formatDate(currentDate);

  // Optional: Show a default city's weather on load
  getWeather("Paris");
});
