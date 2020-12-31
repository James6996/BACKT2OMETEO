require('dotenv').config();
const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://t2ometeo-forecast:t2ometeo-forecast@t2ometeo.zrpjh.mongodb.net';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Introduciendo cors podremos usar nuestro server desde el front

const allCities = require('./routes/allCities.route')

MongoClient.connect(url, function (err, db) {
  if (err) throw err;
  console.log('Connected to BD!!');
  db.close();
});

app.use('/api/all-cities', allCities);

const PORT = Number(process.env.PORT || 3000);
// Declaro el puerto como tipo number, añadimos una variable de entorno o en su defecto el puerto 3000
app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`);
});
