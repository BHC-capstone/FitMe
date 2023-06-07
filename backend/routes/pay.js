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
  user_points,
  payhistory,
} = require('../models');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const dotenv = require('dotenv');
const multer = require('multer');
const AWS = require('aws-sdk');
const { mod } = require('prelude-ls');
const axios = require('axios');
dotenv.config();

// 결제 관련 엔드포인트
router.post('/payment/callback', (req, res) => {
  const { paymentResult } = req.params;

  if (paymentResult === 'success') {
    res.status(200).json({ data: null, message: '결제 에러' });
  } else if (paymentResult === 'cancel') {
    res.status(200).json({ data: null, message: '결제 취소' });
  } else {
    res.status(200).json({ data: null, message: '결제 실패' });
  }
});

// 결제 준비
router.post('/payment', async (req, res) => {
  try {
    const { userId, amount } = req.params;

    const paymentData = {
      cid: 'TC0ONETIME',
      partner_order_id: 'FitMePointCharge',
      partner_user_id: userId,
      item_name: 'FitMe 포인트 충전',
      quantitiy: 1,
      total_amount: amount,
      vat_amount: 0,
      tax_free_amount: 0,
      approval_url: 'https://localhost:3000/charge-success',
      fail_url: 'https://localhost:3000/charge-fail',
      cancel_url: 'https://localhost:3000/charge-cancel',
    };

    const response = await axios.post(
      'https://kapi.kakao.com/v1/payment/ready',
      paymentData,
      {
        headers: {
          Authorization: 'KakaoAK ebd206ac5d003ad23e3a33e7ebf28aa6',
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );

    const { data } = response;

    const pgToken = data.pg_token;
    const tId = data.tid;

    res.status(200).json({ data: { pgToken, tId }, message: '결제 준비' });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: '결제 에러' });
  }
});

// 결제 승인
router.post('/payment/approve', async (req, res) => {
  try {
    const { pgToken, userId, tId } = req.params;

    const approveData = {
      cid: 'TC0ONETIME',
      tid: tId,
      partner_order_id: 'FitMePointCharge',
      partner_user_id: userId,
      pg_token: pgToken,
    };

    const response = await axios.post(
      'https://kapi.kakao.com/v1/payment/approve',
      approveData,
      {
        headers: {
          Authorization: 'KakaoAK ebd206ac5d003ad23e3a33e7ebf28aa6',
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );

    const { data } = response;

    const isSuccess = data.is_approved;
    const paymentId = data.partner_order_id;
    const amount = data.amount;

    if (isSuccess) {
      const point = Math.floor(amount * 0.1);
      await user_points.update(
        { amount: user_points.sequelize.literal(`amount + ${point}`) },
        { where: { userId } },
      );
      await payhistory.create({
        user_id: userId,
        payment_Id: paymentId,
        amount: amount,
        point: point,
        createdAt: new Date(),
      });
      res.status(200).json({ data: paymentId, amount, message: '결제 승인' });
    } else {
      res.status(200).json({ message: '결제 실패' });
    }
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: '결제 승인 에러' });
  }
});

// user 결제 내역 조회
router.get('/payment/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const payhistory = await payhistory.findAll({
      where: { user_id: userId },
    });
    res.status(200).json({ data: payhistory, message: '결제 내역 조회' });
  } catch (error) {
    console.error(err);
    res.status(500).json({ error: '결제 내역 조회 에러' });
  }
});

module.exports = router;
