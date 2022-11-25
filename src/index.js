import "./style/main.css";
import forecast from "./Images/forecast.svg"

const input = document.querySelector('input');
const cityName = document.querySelector('h1');
const temperature = document.querySelector('.temp');
const high = document.querySelector('.high');
const low = document.querySelector('.low');
const description = document.querySelector('.description');
const forecastImg = document.querySelector('.forecastImg');

const day1Forecast = document.querySelector('.day1');
const day2Forecast = document.querySelector('.day2');
const day3Forecast = document.querySelector('.day3');
const day4Forecast = document.querySelector('.day4');
const day5Forecast = document.querySelector('.day5');
const day6Forecast = document.querySelector('.day6');
const day7Forecast = document.querySelector('.day7');
const day8Forecast = document.querySelector('.day8');
const day9Forecast = document.querySelector('.day9');
const day10Forecast = document.querySelector('.day10');

let searchTerm = 'los angeles';
let temp = ' °F';

forecastImg.src = forecast

async function getData() {
  try {
    const weatherData = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchTerm + '&APPID=c578ff5ed4132c56ab86d97945709d42');
    const weatherDataJSON = await weatherData.json();
    return weatherDataJSON;
  } catch (error) {
    console.log(error);
  };
};

function getInfo() {
  if (input.value) searchTerm = input.value;
  const data = getData();
  
  data
  .then( function(response) {
    if (response.cod === '404') { 
      input.value = ''
      response.message 
      return
    }

    console.log(response)
    cityName.innerText = response.name + ', ' + response.sys.country;
    temperature.innerText = response.main.temp + temp;
    description.innerText = response.weather[0].description
    high.innerText = 'H: ' + response.main.temp_max + temp
    low.innerText = 'L: ' + response.main.temp_min + temp
  })
  .catch(function(error) {
    console.log(error);
  });
}

getInfo()

input.addEventListener('keypress', (event => {
  const key = event.key
  if (key === 'Enter') getInfo()
}))


