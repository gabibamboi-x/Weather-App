export const dom = (() => {
  return {
    input : document.querySelector('input'),
    invalid : document.querySelector('.invalid'),
    content : document.querySelector('.content'),
    cityName : document.querySelector('h1'),
    temperatureIMG : document.querySelector('.temperature'),
    temperature : document.querySelector('.temp'),
    high : document.querySelector('.high'),
    low : document.querySelector('.low'),
    description : document.querySelector('.description'),
    forecastImg : document.querySelector('.forecastImg'),
    weatherStatus : document.querySelector('.weatherStatus'),
    loading : document.querySelector('.loadingContent'),
    loadingText : document.querySelector('.loadingText'),
    loadingICN : document.querySelector('.loading'),

    feelsLike : document.querySelector('.feels_like'),
    feelsLikeP : document.querySelector('.feels_likeP'),
    humidityIMG : document.querySelector('.humidityIMG'),
    humidityP : document.querySelector('.humidityP'),
    
    forecast : document.querySelector('.forecast'),
  }
})()