var express = require('express');
var router = express.Router();
const { trainers } = require('../models');

// trainerlist paging
router.get('/trainerlist', async function (req, res) {
  const trainerInfo = await trainers.findAll();
  res.send(trainerInfo);
});