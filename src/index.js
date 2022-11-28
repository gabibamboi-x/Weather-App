import "./style/main.css";
import { dom } from "./modules/dom";
import { images } from "./modules/images";
import { handleForecast } from "./modules/handleForecast";
import forecast from "./Images/forecast.svg";
import feels_like from "./Images/feelsLike.svg";
import humidity from "./Images/humidity.svg";
import temperature from "./Images/temperature.svg";


let searchTerm = 'los angeles';
let previousTerm;
export let tempType = 'C';
export let temp = ' °F';
let currentTemp;
let highTemp;
let lowTemp;
let feel;

dom.temperatureIMG.src = temperature;
dom.feelsLike.src = feels_like;
dom.humidityIMG.src = humidity;
dom.forecastImg.src = forecast;

async function getData() {
  try {
    // get the current weather for the specified city
    const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=imperial&APPID=c578ff5ed4132c56ab86d97945709d42`);
    const weatherDataJSON = await weatherData.json();

    if (weatherDataJSON.cod === '404') {
      searchTerm = previousTerm;
      dom.invalid.style.display = 'block';
      dom.invalid.innerText = "Location not found. The format of your search has to be as follows: 'City', 'City, State' or 'City, Country'.";
      dom.input.value = '';
      throw Error('Invalid request');
    }
    
    // get the city's weather forecast
    const weatherForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${weatherDataJSON.coord.lat}&lon=${weatherDataJSON.coord.lon}&units=imperial&appid=c578ff5ed4132c56ab86d97945709d42`);
    const weatherForecastJSON = await weatherForecast.json();

    // return the weather data
    return {
      weatherDataJSON : weatherDataJSON,
      weatherForecast : weatherForecastJSON,
    };
  } catch (error) {
    console.log(error);
  };
};

export function convert(t) {
  // convert to celsius from fahrenheit
  return Math.round((t - 32) * (5/9));
}

async function getInfo() {
  // check if theres a city name in the input field
  if (dom.input.value) searchTerm = dom.input.value;
  // remove the error message 
  dom.content.style.display = 'none';
  dom.invalid.style.display = 'none';
  dom.invalid.innerText = '';
  // show the loading icon
  dom.loadingICN.classList.add('active');
  dom.loading.style.display = '';
  dom.input.value = '';
  // get the data
  const data = getData();

  data
  .then( function(response) {
    // set a previous term if we got a response
    previousTerm = searchTerm;
    // hide the loading icon
    dom.loadingICN.classList.remove('active');
    dom.loading.style.display = 'none';
    dom.content.style.display = '';

    // store the data, ready for conversion if needed
    currentTemp = Math.round(Number(response.weatherDataJSON.main.temp));
    highTemp = Math.round(Number(response.weatherDataJSON.main.temp_max));
    lowTemp = Math.round(Number(response.weatherDataJSON.main.temp_min));
    feel = Math.round(Number(response.weatherDataJSON.main.feels_like));

    // convert if necessary
    if (tempType === 'C') {
      currentTemp = convert(currentTemp);
      highTemp = convert(highTemp);
      lowTemp = convert(lowTemp);
      feel = convert(feel);
      temp = ' °C';
    }

    // show the data to the user
    dom.cityName.innerText = response.weatherDataJSON.name + ', ' + response.weatherDataJSON.sys.country;
    dom.temperature.innerText = currentTemp + temp;
    dom.description.innerText = response.weatherDataJSON.weather[0].description;
    dom.high.innerText = 'H: ' + highTemp + temp;
    dom.low.innerText = 'L: ' + lowTemp + temp;
    dom.feelsLikeP.innerText = feel + temp;
    dom.humidityP.innerText = Math.round(Number(response.weatherDataJSON.main.humidity)) + '%';

    // show the forecast
    handleForecast(response.weatherForecast);
  })
  .catch(function(error) {
    console.log(error);
  });
};

// initial api call when the page is loaded
getInfo();

// change the unit
dom.button.addEventListener('click', () => {
  if (tempType === 'F') {
    tempType = 'C';
    temp = ' °C';
  } else {
    tempType = 'F';
    temp = ' °F';
  }

  getInfo();
});

// by pressing enter you submit the city name
dom.input.addEventListener('keypress', (event => {
  const key = event.key;
  if (key === 'Enter') getInfo();
}));

// hide the error message on input
dom.input.addEventListener('input', () => {
  dom.invalid.style.display = 'none';
  dom.invalid.innerText = '';
});