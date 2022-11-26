import { dom } from "./dom"
import { temp } from "../index"
import { icons } from "./icons"

export function handleForecast(weatherForecast) {

  dom.forecast.innerHTML = ''
  
  for (let i in weatherForecast.list) {

    let fTemp = Math.round(Number(weatherForecast.list[i].main.temp))
    let date = weatherForecast.list[i].dt_txt.split(' ')[0].split('-')[2]
    let hour = weatherForecast.list[i].dt_txt.split(' ')[1].split(':')[0] + ':00'
    let icon = weatherForecast.list[i].weather[0].icon
    let forecastTemp = fTemp + temp

    let currHour = weatherForecast.list[i].dt_txt.split(' ')[1].split(':')[0]

    if (Number(currHour) < 18 && Number(currHour) > 5) {
      icon = icon.replace('n', 'd')
    } else {
      icon = icon.replace('d', 'n')
    }

    const wrapperDiv = document.createElement('div')
    wrapperDiv.setAttribute('class', 'forecastWrapper')
    const dateP = document.createElement('p')
    dateP.innerText = date
    const hourP = document.createElement('p')
    hourP.innerText = hour
    const iconI = new Image
    iconI.src = icons['i' + icon]
    const tempP = document.createElement('p')
    tempP.innerText = forecastTemp

    wrapperDiv.appendChild(dateP)
    wrapperDiv.appendChild(hourP)
    wrapperDiv.appendChild(iconI)
    wrapperDiv.appendChild(tempP)
    dom.forecast.appendChild(wrapperDiv)
  }
}