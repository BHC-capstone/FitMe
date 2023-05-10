var express = require('express');
var router = express.Router();
const { trainers, trainer_points, pt_requests, trainer_manage } = require('../models');

// check pt user list
router.get('/checkptuserlist/:id', async function (req, res) {
    try {
      const check_pt_user_list = await trainer_manage.findAll({
        where: { trainer_id: req.params.id },
      });
      res.status(200).json({ data: check_pt_user_list, message: '' });
    } catch (err) {
      console.log(err);
    }
});

// check pt user detail
router.get('/checkptuserdetail/:user_id/:id', async function (req, res) {
  try {
    const check_pt_user_detail = await trainer_manage.findOne({
      where: { trainer_id: req.body.id, user_id: req.body.user_id },
    });
    res.status(200).json({ data: check_pt_user_detail, message: '' });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
