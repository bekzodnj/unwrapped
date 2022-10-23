const express = require('express');

const router = express.Router();

const MongoClient = require('mongodb').MongoClient;

const activitesJson = require('../resources/activities.json');

const { config } = require('../resources/config');

router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});

// GET /api/v1/activites
router.get('/activities', (req, res) => {
  res.json({
    data: activitesJson,
  });
});

// GET /api/v1/rewards
router.get('/reward', async (req, res) => {
  try {
    MongoClient.connect(config.dbUrl, async (err, db) => {
      if (err) throw err;

      const dbo = db.db('antavo');
      const rewardCollection = dbo.collection('Rewards');

      const result = await rewardCollection.find({}).toArray();
      //console.log(result);

      res.status(200).json({
        status: 200,
        data: result,
        length: result.length,
      });
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = router;
