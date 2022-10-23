const express = require('express');

const router = express.Router();

const MongoClient = require('mongodb').MongoClient;

const { config } = require('../resources/config');

const event_actions = require('../resources/event_actions.json');

// GET /api/events
// get max N number of events
router.get('/', async (req, res) => {
  try {
    MongoClient.connect(config.dbUrl, async (err, db) => {
      if (err) throw err;

      const dbo = db.db('antavo');
      const eventsCollection = dbo.collection('Events');

      const result = await eventsCollection
        .find({
          //   action: 'activity',
          //   'properties.activity': '624409cc3f7d41816127e65f',
          action: 'checkout',
          guest: 'true',
          //   'properties.level': 'gold',
        })
        // .distinct('customer');
        // .limit()
        .toArray();

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

// GET /api/v1/events/users
// get unique customer IDs
router.get('/users', async (req, res) => {
  try {
    MongoClient.connect(config.dbUrl, async (err, db) => {
      if (err) throw err;

      const dbo = db.db('antavo');
      const eventsCollection = dbo.collection('Events');

      const result = await eventsCollection
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

// GET /api/events/actions
// get unique action names
router.get('/actions', async (req, res) => {
  // use already calculated data json
  const flag = true;
  if (flag) {
    res.status(200).json({
      data: event_actions,
      total: event_actions.length,
    });
  } else {
    try {
      MongoClient.connect(config.dbUrl, async (err, db) => {
        if (err) throw err;

        const dbo = db.db('antavo');
        const eventsCollection = dbo.collection('Events');

        const result = await eventsCollection
          // .find({ action: 'checkout' })
          .distinct('action');
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
  }
});

module.exports = router;
