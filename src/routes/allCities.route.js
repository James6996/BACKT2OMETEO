const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb+srv://t2ometeo-forecast:t2ometeo-forecast@t2ometeo.zrpjh.mongodb.net';
const router = express.Router();

router.get('/all-cities', async (req, res) => {
  try {
    MongoClient.connect(url, function (err, db) {
      if (err) throw err;
      var dbo = db.db('t2ometeo-forecast');
      const cities =  dbo.collection('forecast').find();

      return res.status(200).json({ data: cities });
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
