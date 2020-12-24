require('dotenv').config();
const fetch = require('node-fetch');

const cities = require('../constants/cities');
const { getCitiesCoords, getCitiesWeather } = require('../constants/openWeather');

// Hacemos este script el cual sería interesante llamar una vez al día para traer información lo más actual posible

const dailyScript = async () => {
  try {
    const citiesCoordsPromise = cities.map((city) => {
      const coordsApi = getCitiesCoords(city);
      return fetch(coordsApi).then((res) => res.json());
    });

    const citiesCoords = await Promise.all(citiesCoordsPromise);
    const citisCoordsResult = citiesCoords.map(({ name, coord }) => ({
      name,
      lat: coord.lat,
      lon: coord.lon,
    }));

    const weatherPromise = citisCoordsResult.map(({ lat, lon }) => {
      const weatherApi = getCitiesWeather(lat, lon);
      return fetch(weatherApi).then((res) => res.json());
    });

    const citiesWeather = await Promise.all(weatherPromises);
    
    // Hemos utilizado el mismo proceso dos veces con promesas, ya que primero se realiza una entera y luego la siguiente,
    // y en caso de haya algún problema se parará y saltará un error donde hay fallado. Este erro lo hará el catch, más abajo *
    // El siguiente paso tendrá que ser formatear los datos que nos trae la API ya que no llegan como esperamos.
  }
  catch (err) { // *
    console.log('Weather dailyScript error:', err);
  }
};
