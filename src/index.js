import "./style/main.css";
import { dom } from "./modules/dom";
import { handleForecast } from "./modules/handleForecast";
import forecast from "./Images/forecast.svg"
import feels_like from "./Images/feelsLike.svg"
import humidity from "./Images/humidity.svg"
import temperature from "./Images/temperature.svg"


let searchTerm = 'los angeles';
export let temp = ' °F';

dom.temperatureIMG.src = temperature
dom.feelsLike.src = feels_like
dom.humidityIMG.src = humidity
dom.forecastImg.src = forecast

async function getData() {
  try {
    // get the current weather for the specified city
    const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&APPID=c578ff5ed4132c56ab86d97945709d42`);
    const weatherDataJSON = await weatherData.json();

    if (weatherDataJSON.cod === '404') {
      dom.invalid.style.display = 'block'
      dom.invalid.innerText = "Location not found. The format of your search has to be as follows: 'City', 'City, State' or 'City, Country'.";
      dom.input.value = '';
      throw Error('Invalid request')
    }
    
    // get the city's weather forecast
    const weatherForecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${weatherDataJSON.coord.lat}&lon=${weatherDataJSON.coord.lon}&appid=c578ff5ed4132c56ab86d97945709d42`);
    const weatherForecastJSON = await weatherForecast.json();

    // return the weather data

    return {
      weatherDataJSON : weatherDataJSON,
      weatherForecast : weatherForecastJSON,
    }
  } catch (error) {
    console.log(error);
  };
};

async function getInfo() {
  if (dom.input.value) searchTerm = dom.input.value;
  dom.content.style.display = 'none';
  dom.invalid.style.display = 'none';
  dom.invalid.innerText = '';
  dom.loadingICN.classList.add('active');
  dom.loading.style.display = ''
  dom.loadingText.style.display = ''
  dom.input.value = '';
  const data = getData();

  data
  .then( function(response) {
    dom.loadingICN.classList.remove('active');
    dom.loadingText.style.display = 'none'
    dom.loading.style.display = 'none'
    dom.content.style.display = '';

    let currentTemp = Math.round(Number(response.weatherDataJSON.main.temp))
    let highTemp = Math.round(Number(response.weatherDataJSON.main.temp_max))
    let lowTemp = Math.round(Number(response.weatherDataJSON.main.temp_min))
    let feel = Math.round(Number(response.weatherDataJSON.main.feels_like))
    let humidityData = Math.round(Number(response.weatherDataJSON.main.humidity))


    console.log(response.weatherDataJSON)

    dom.cityName.innerText = response.weatherDataJSON.name + ', ' + response.weatherDataJSON.sys.country;
    dom.temperature.innerText = currentTemp + temp;
    dom.description.innerText = response.weatherDataJSON.weather[0].description;
    dom.high.innerText = 'H: ' + highTemp + temp;
    dom.low.innerText = 'L: ' + lowTemp + temp;
    dom.feelsLikeP.innerText = feel + temp
    dom.humidityP.innerText = humidityData + '%'

    handleForecast(response.weatherForecast)
  })
  .catch(function(error) {
    console.log(error);
  });
}

getInfo()

dom.input.addEventListener('keypress', (event => {
  const key = event.key;
  if (key === 'Enter') getInfo();
}))

dom.input.addEventListener('input', () => {
  dom.invalid.style.display = 'none';
  dom.invalid.innerText = '';
})
