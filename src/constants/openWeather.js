BASE_URL = 'http://api.openweathermap.org/data/2.5/' 
BASE_URL_2 = 'https://api.openweathermap.org/data/2.5/'

const API_ID = process.env.API_ID;

// Para poder obtener los datos que queremos necesitamos dos direcciones distintas de la API de OpenWeather,
// la primera que vamos a utilizar será para obtener las coordenadas, a continuación  las utilizaremos para
// obtener los datos que queremos actuales y de 7 días en adelante.

const getCitiesCoords = (city) => `${BASE_URL}weather?q=${city},ES&appid=${API_ID}`;

const getCitiesWeather = (lat, lon) =>
  `${BASE_URL_2}onecall?lat=${lat}&lon=${lon}&exclude='minutely','hourly','alert'&appid=${API_ID}`;

// Ahora exportamos ambas constantes

module.exports = {
    getCitiesCoords,
    getCitiesWeather
};
