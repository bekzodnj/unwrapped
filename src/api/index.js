const express = require('express');

const router = express.Router();

const activitesJson = require('../resources/activities.json');

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

module.exports = router;
