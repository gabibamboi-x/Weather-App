let searchTerm = 'London';

async function getData() {
  try {
    const weatherData = await fetch('https://api.openweathermap.org/data/2.5/weather?q=' + searchTerm + '&APPID=c578ff5ed4132c56ab86d97945709d42');
    const weatherDataJSON = await weatherData.json();
    return weatherDataJSON;
  } catch (error) {
    console.log(error);
  };
};

document.querySelector('button').addEventListener('click', () => {
  searchTerm = document.querySelector('input').value;
  const data = getData();

  data
    .then( function(response) {
      console.log(response);
      document.querySelector('h1').innerText = response.name;
      document.querySelector('.temp').innerText = 'Temperature: ' + response.main.temp;
      document.querySelector('.humidity').innerText = 'Humidity: ' + response.main.humidity;
    })
    .catch(function(error) {
      console.log(error);
    });
});