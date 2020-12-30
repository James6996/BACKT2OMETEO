require('dotenv').config();
const express = require('express');
const cors = require('cors');
const MongoStore = require('connect-mongo')
const mongoose = require('mongoose')


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// Introduciendo cors podremos usar nuestro server desde el front


const PORT = Number(process.env.PORT || 3000); 
// Declaro el puerto como tipo number, añadimos una variable de entorno o en su defecto el puerto 3000
app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`);
});