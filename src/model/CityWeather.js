const mongoose = require('mongoose')

const { Schema, model } = mongoose

const CityWeatherSchema = new Schema(
  {
    name: { type: String},
    temperature: { type: Number },
    date: { type: Date},
    threeHoursDate: { type: String},
    
  }
)

const CityWeather = model('CityWeather', CityWeatherSchema)

module.exports = CityWea;ther
