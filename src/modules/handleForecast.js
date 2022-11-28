import { dom } from "./dom";
import { temp, tempType, convert } from "../index";
import { images } from "./images";

export function handleForecast(weatherForecast) {
  // clear the forecast div before appending new children
  dom.forecast.innerHTML = '';
  
  for (let i in weatherForecast.list) {
    let fTemp = Math.round(Number(weatherForecast.list[i].main.temp));

    // convert the temperature if needed
    if (tempType === 'C') fTemp = convert(fTemp);

    // get the date, hour and icon id from the api response
    let date = weatherForecast.list[i].dt_txt.split(' ')[0].split('-')[2];
    let hour = weatherForecast.list[i].dt_txt.split(' ')[1].split(':')[0] + ':00';
    let icon = weatherForecast.list[i].weather[0].icon;
    let currHour = weatherForecast.list[i].dt_txt.split(' ')[1].split(':')[0];
    let forecastTemp = fTemp + temp;

    // set day icons for hours between 5 and 18
    if (Number(currHour) < 18 && Number(currHour) > 5) {
      icon = icon.replace('n', 'd');
    } else {
      icon = icon.replace('d', 'n');
    }

    // create and append the children to the forecast div
    const wrapperDiv = document.createElement('div');
    wrapperDiv.setAttribute('class', 'forecastWrapper');
    const dateP = document.createElement('p');
    dateP.innerText = date;
    const hourP = document.createElement('p');
    hourP.innerText = hour;
    const iconI = new Image;
    iconI.src = images['i' + icon];
    const tempP = document.createElement('p');
    tempP.innerText = forecastTemp;

    wrapperDiv.appendChild(dateP);
    wrapperDiv.appendChild(hourP);
    wrapperDiv.appendChild(iconI);
    wrapperDiv.appendChild(tempP);
    dom.forecast.appendChild(wrapperDiv);
  }
}