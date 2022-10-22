const express = require('express');

const router = express.Router();

const MongoClient = require('mongodb').MongoClient;

const activitesJson = require('../resources/activities.json');

const Reward = require('../models/Reward');

const DB_URL =
  'mongodb+srv://bekzodnj:Zzomeinforu123@cluster0.72lzwp2.mongodb.net/?retryWrites=true&w=majority';

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
    MongoClient.connect(DB_URL, async (err, db) => {
      if (err) throw err;

      const dbo = db.db('Events');
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

// GET /api/v1/events
// get max 30 events
router.get('/events', async (req, res) => {
  try {
    MongoClient.connect(DB_URL, async (err, db) => {
      if (err) throw err;

      const dbo = db.db('Events');
      const rewardCollection = dbo.collection('Events');

      const result = await rewardCollection
        .find({ action: 'checkout' })
        .limit(50)
        .toArray();
      //console.log(result);

      res.status(200).json({
        status: 200,
        data: result,
        total: result.length,
      });
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

// GET /api/v1/events
// get unique customers
router.get('/events/users', async (req, res) => {
  try {
    MongoClient.connect(DB_URL, async (err, db) => {
      if (err) throw err;

      const dbo = db.db('Events');
      const rewardCollection = dbo.collection('Events');

      const result = await rewardCollection
        // .find({ action: 'checkout' })
        .distinct('customer');
      // .limit(50)
      // .toArray();
      //console.log(result);

      res.status(200).json({
        status: 200,
        data: result,
        total: result.length,
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
