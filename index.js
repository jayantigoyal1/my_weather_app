// Function to update the weather UI with data from the API response
function updateWeatherUI(response) {
  const data = response.data;

  // Check if the API response has the expected structure
  if (!data || !data.temperature || !data.city) {
    console.error("API response is not in the expected format.");
    return;
  }

  // Update the city name
  const cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = data.city;

  // Update the temperature
  const temperatureElement = document.querySelector("#temperature-value");
  temperatureElement.innerHTML = Math.round(data.temperature.current);

  // Update the weather description
  const descriptionElement = document.querySelector("#weather-description");
  descriptionElement.innerHTML = data.condition.description;

  // Update the humidity
  const humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = data.temperature.humidity;

  // Update the wind speed, converting from m/s to km/h if necessary
  const windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = Math.round(data.wind.speed * 3.6); 

  // Update the weather icon
  const iconElement = document.querySelector("#icon");
  iconElement.src = data.condition.icon_url;
  iconElement.alt = data.condition.description;
}

// Function to fetch weather data for a given city
function getWeather(city) {
  const apiKey = "a4c2o660020f7btfdfc6a5d36d3cc4f2";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(updateWeatherUI).catch(error => {
    console.error("Error fetching weather data:", error);
    alert("Could not fetch weather for the specified city. Please try again.");
  });
}

// Function to handle the search form submission
function handleSearch(event) {
  event.preventDefault();
  const searchInput = document.querySelector("#search-input");
  const city = searchInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name.");
  }
}

// Function to format the current date and time
function formatDate(date) {
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const formattedDay = days[date.getDay()];
  return `${formattedDay} ${hours}:${minutes}`;
}

// Main function to initialize the application
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSearch);

  const currentDateElement = document.querySelector("#current-date");
  currentDateElement.innerHTML = formatDate(new Date());

  // Load weather for a default city on page load
  getWeather("Paris");
});