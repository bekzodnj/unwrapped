const express = require('express');

const router = express.Router();

const MongoClient = require('mongodb').MongoClient;

const { config } = require('../../resources/config');

// GET /api/events
// get max N number of events
router.get('/level_set/:param', async (req, res) => {
  // all, gold, silver, member
  const { param } = req.params;

  try {
    MongoClient.connect(config.dbUrl, async (err, db) => {
      if (err) throw err;

      const dbo = db.db('antavo');
      const eventsCollection = dbo.collection('Events');

      let result;
      switch (param) {
        case 'all':
          // eslint-disable-next-line no-case-declarations
          result = await eventsCollection
            .find({
              action: 'level_set',
              //   'properties.level': 'gold',
            })
            .toArray();

          res.status(200).json({
            status: 200,
            data: result,
            total: result.length,
          });

          break;
        case 'gold':
          result = await eventsCollection
            .find({
              action: 'level_set',
              'properties.level': 'gold',
            })
            .toArray();

          res.status(200).json({
            status: 200,
            data: result,
            total: result.length,
          });
          break;
        case 'silver':
          result = await eventsCollection
            .find({
              action: 'level_set',
              'properties.level': 'silver',
            })
            .toArray();

          res.status(200).json({
            status: 200,
            data: result,
            total: result.length,
          });
          break;
        case 'member':
          result = await eventsCollection
            .find({
              action: 'level_set',
              'properties.level': 'member',
            })
            .toArray();

          res.status(200).json({
            status: 200,
            data: result,
            total: result.length,
          });
          break;

        case 'undefined':
          result = await eventsCollection
            .find({
              action: 'level_set',
              'properties.level': 'undefined',
            })
            .toArray();

          res.status(200).json({
            status: 200,
            data: result,
            total: result.length,
          });
          break;

        default:
          result = await eventsCollection
            .find({
              action: 'level_set',
              //   'properties.level': 'gold',
            })
            .toArray();

          res.status(200).json({
            status: 200,
            data: result,
            total: result.length,
          });
          break;
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 400,
      message: err.message,
    });
  }
});

module.exports = router;
