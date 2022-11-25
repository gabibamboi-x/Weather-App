import "./style/main.css"

let input = document.querySelector('input')
let searchTerm = 'los angeles';
let temperature = ' °F'

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
    }

    document.querySelector('h1').innerText = response.name + ', ' + response.sys.country;
    document.querySelector('.temp').innerText = 'Temperature: ' + response.main.temp + temperature;
    document.querySelector('.humidity').innerText = 'Humidity: ' + response.main.humidity;
  })
  .catch(function(error) {
    console.log(error);
  });
}

getInfo()

const btn = document.querySelector('button');

btn.addEventListener('click', () => {
  getInfo()
});
