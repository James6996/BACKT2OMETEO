require('dotenv').config();
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const addSeconds = require('date-fns/addSeconds');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://t2ometeo-forecast:t2ometeo-forecast@t2ometeo.zrpjh.mongodb.net';
const cities = require('../constants/cities');
const { getWeather } = require('../constants/openWeather');

const today = new Date(1970, 1, 1);

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
      MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db('t2ometeo-forecast');
        var myobj = {
          name: city.city.name,
          forecast: city.list.map((forecast) => {
            return {
              date: addSeconds(new Date(1970, 1, 1), forecast.dt), // sumar estos segundos al 1-1-1970 para obtener la fecha actual.
              temperature: Math.round(forecast.main.temp - 273.15),
              dateThreeHours: forecast.dt_txt,
            };
          }),
        };
        dbo
          .collection('forecast')
          .findOne({ name: city.city.name })
          .then((res) => {
            if (!res) {
              dbo.collection('forecast').insertOne(myobj, function (err, res) {
                if (err) throw err;
                console.log('1 document inserted');
                db.close();
              });
            } else {
              const newValues
              dbo
                .collection('forecast')
                .updateOne(
                  { name: city.city.name },
                  { $set: { forecast: [...res.forecast, newValues] } },
                  function (err, res) {
                    if (err) throw err;
                    console.log('1 document inserted');
                    db.close();
                  }
                );
            }
          });
      });
      return {
        name: city.city.name,
        forecast: city.list.map((forecast) => {
          return {
            date: addSeconds(new Date(1970, 0, 1, 1), forecast.dt), // sumar estos segundos al 1-1-1970 para obtener la fecha actual.
            temperature: Math.round(forecast.main.temp - 273.15),
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
