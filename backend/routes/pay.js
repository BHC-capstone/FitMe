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
    const { userId, amount } = req.body;

    const paymentData = {
      cid: 'TC0ONETIME',
      partner_order_id: 'FitMePointCharge',
      partner_user_id: userId,
      item_name: 'FitMe 포인트 충전',
      quantity: 1,
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
          Authorization: `KakaoAK ${'ebd206ac5d003ad23e3a33e7ebf28aa6'}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );

    const { data } = response;
    await payhistory.create({
      user_id: userId,
      tid: data.tid,
      created: data.created_at,
      approved: data.created_at,
      amount: data.amount,
      status: 'ready',
    });
    const tId = data.tid;
    const redirectUrl = data.next_redirect_pc_url;
    console.log(data);

    res.status(200).json({ data: { tId, redirectUrl }, message: '결제 준비' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: '결제 에러' });
  }
});

// 결제 승인
router.post('/payment/approve', async (req, res) => {
  try {
    const { pgToken, userId, tId } = req.body;

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
          Authorization: `KakaoAK ${'ebd206ac5d003ad23e3a33e7ebf28aa6'}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      },
    );

    const { data } = response;

    const point = data.amount.total;

    const updatepoint = await user_points.findOne({
      where: { user_id: userId },
    });
    await user_points.update(
      { amount: updatepoint.amount + point },
      { where: { user_id: userId } },
    );
    await payhistory.update(
      {
        user_id: userId,
        tid: tId,
        created: data.created_at,
        approved: data.approved_at,
        amount: point,
        status: 'success',
        payname: 'kakaopay',
      },
      { where: { tid: tId } },
    );
    res.status(200).json({ data: null, message: '결제 승인' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: '결제 승인 에러' });
  }
});

// user 결제 내역 조회
router.get('/payment/user/:userId', async (req, res) => {
  try {
    const { userId } = req.body;
    const Payhistory = await payhistory.findAll({
      where: { user_id: userId },
    });
    res.status(200).json({ data: Payhistory, message: '결제 내역 조회' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: '결제 내역 조회 에러' });
  }
});

router.get('/payment/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (status === 'fail') {
      await payhistory.update({
        status: 'fail',
      });
      res.status(200).json({ data: null, message: '결제 실패' });
    } else if (status === 'cancel') {
      await payhistory.update({
        status: 'cancel',
      });
      res.status(200).json({ data: null, message: '결제 취소' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: '결제 내역 조회 에러' });
  }
});

module.exports = router;
