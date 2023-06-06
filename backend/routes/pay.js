var express = require('express');
var router = express.Router();
const { sequelize } = require('../models');
const {
  trainers,
  users,
  pt_requests,
  exercise_routines,
  schedules,
  trainer_manage,
  meal_plan,
} = require('../models');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const dotenv = require('dotenv');
const multer = require('multer');
const AWS = require('aws-sdk');
const { mod } = require('prelude-ls');
const axios = require('axios');
dotenv.config();

router.post('/approval', async (req, res) => {
  const { cid, tid, partner_order_id, partner_user_id, pg_token } = req.body;

  const url = 'https://kapi.kakao.com/v1/payment/approve';
  const apiKey = 'YOUR_KAKAOPAY_API_KEY';

  try {
    const response = await axios.post(
      url,
      {
        cid,
        tid,
        partner_order_id,
        partner_user_id,
        pg_token,
      },
      {
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
        },
      },
    );

    if (response.data.code === 0) {
      res
        .status(200)
        .json({ success: true, message: 'Payment approved successfully' });
    } else {
      res
        .status(400)
        .json({ success: false, message: 'Payment approval failed' });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error occurred during payment approval',
    });
  }
});

module.exports = router;
