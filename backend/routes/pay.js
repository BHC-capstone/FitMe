var express = require("express");
var router = express.Router();
const { sequelize } = require("../models");
const {
    trainers,
    users,
    pt_requests,
    exercise_routines,
    schedules,
    trainer_manage,
    meal_plan,
} = require("../models");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const dotenv = require("dotenv");
const multer = require("multer");
const AWS = require("aws-sdk");
const { mod } = require("prelude-ls");

//AWS s3 관련
const imageUpload = require("../modules/s3upload").upload;
const videoupload = require("../modules/s3upload").videoUpload;
const s3 = require("../modules/s3upload").s3;

dotenv.config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);  // Stripe API 키

// 결제 API 엔드포인트
router.post('/payment', async (req, res) => {
  const { amount, currency, source, description } = req.body;

  try {
    // Stripe 결제 요청
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      source,
      description,
    });

    // 결제 성공
    res.status(200).json({
      success: true,
      paymentIntentId: paymentIntent.id,
      message: 'Payment successful',
    });
  } catch (error) {
    // 결제 실패
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Payment failed',
    });
  }
});

module.exports = router;



module.exports = router;