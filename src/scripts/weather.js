require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const cities = require('../constants/cities');
const { getWeather } = require('../constants/openWeather');
const { json } = require('express');

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
      const i = city['list'].lenght;
      console.log(i);
      return {
        
        name: city.city.name,
        date: city['list'][i]['dt'],
        threeHoursDate: city['list'][i]['dt_txt'],
        temperature: city['list'][i]['temp']
      };
    });

    console.log(citiesWeather);

    const filePath = path.join(__dirname, './weather.json');
    fs.writeFileSync(filePath, JSON.stringify(mapCitiesWeather));
  } catch (err) {
    console.log('Weather dailyScript error:', err);
  }
};
dailyScript();
