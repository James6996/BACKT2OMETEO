require('dotenv').config();
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');

const cities = require('../constants/cities');
const { getCitiesCoords, getCitiesWeather } = require('../constants/openWeather');

// Hacemos este script el cual sería interesante llamar una vez al día para traer información lo más actual posible

const dailyScript = async () => {
  try {
    const citiesCoordsPromises = cities.map((city) => {
      const coordApi = getCitiesCoords(city);
      return fetch(coordApi)
        .then((res) => res.json())
        .then((content) => console.log(content));
    });

    const citiesCoords = await Promise.all(citiesCoordsPromises);
    const citiesCoordsResult = citiesCoords.map(({ name, coord }) => ({
      name,
      lon: coord.lon,
      lat: coord.lat,
    }));
    console.log(citiesCoordsResult);

    const weatherPromise = citiesCoordsResult.map(({ lat, lon }) => {
      const weatherApi = getCitiesWeather(lat, lon);
      return fetch(weatherApi).then((res) => res.json());
    });

    const citiesWeather = await Promise.all(weatherPromise);

    // Hemos utilizado el mismo proceso dos veces con promesas, ya que primero se realiza una entera y luego la siguiente,
    // y en caso de haya algún problema se parará y saltará un error donde hay fallado. Este erro lo hará el catch, más abajo *

    // El siguiente paso tendrá que ser formatear los datos que nos trae la API ya que no llegan como esperamos.

    const result = citiesCoordsResult.map((coordResult, index) => ({
      ...coordResult,
      daily: citiesWeather[index].daily.map(({ dt, temp }) => ({
        date: new Date(dt * 1000), // Multiplicamos por 1000 porque viene en segundo de la API
        temp: temp.day, // Viene en Farenheits (hay más para cada momento del día: min, max, night...)
      })),
    }));
    console.log(result);

    const filePath = path.join(__dirname);
    fs.writeFileSync(filePath, JSON.stringify(result));
  } catch (err) {
    console.log('Weather dailyScript error:', err);
  }
};
dailyScript();
