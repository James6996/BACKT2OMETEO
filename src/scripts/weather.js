require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const cities = require('../constants/cities');
const { getWeather } = require('../constants/openWeather');

// Hacemos este script el cual sería interesante llamar una vez al día para traer información lo más actual posible

const dailyScript = async () => {
  try {
    const citiesWeather = await Promise.all(
      cities.map(async (city) => {
        const citiesApi = getWeather(city);
        const cityResult = await axios.get(citiesApi, {
          headers: {
            Accept: '*/*',
            'Accept-Encoding': 'gzip, deflate, br',
            Connection: 'keep-alive',
          },
        });

        return cityResult.data;
      })
    );
    const mapCitiesWeather = citiesWeather.map((city) => {
      return {
        name: city.city.name,
        forecast: city.list.map((forecast) => {
          return {
            date: forecast.dt,
            temperature: (forecast.main.temp - 273.15).toFixed(2),
            dateThreeHours: forecast.dt_txt,
          };
        }),
      };
    });

    const filePath = path.join(__dirname, './weather.json');
    fs.writeFileSync(filePath, JSON.stringify(mapCitiesWeather));
  } catch (err) {
    console.log('Weather dailyScript error:', err);
  }
};
dailyScript();
