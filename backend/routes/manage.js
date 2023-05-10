var express = require('express');
var router = express.Router();
const { trainers, trainer_points, pt_requests, trainer_manage, user_tag } = require('../models');

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


// user tag api
router.get('/tag/:user_id', async function (req, res) {
    try {
        const tagInfo = await user_tag.findAll({
            where: { user_id: req.params.user_id },
        });
        if (tagInfo != undefined) {
            res.status(200).json({ data: tagInfo, message: '' });
        } else {
            res.status(401).json({ data: null, message: '' });
        }
    } catch (err) {
        console.log(err);
    }
});




module.exports = router;
