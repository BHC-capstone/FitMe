/* eslint-disable no-await-in-loop */
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
  AdminStatistics,
  trainer_sign_request,
  certifications,
  certification_auth_request,
  trainer_points,
  trainer_cert,
  dailytrainercounts,
  dailyusercounts,
  dailyrequestcounts,
} = require('../models');
const initModels = require('../models/init-models');
const { Op } = require('sequelize');
const models = initModels(sequelize);
const bcrypt = require('bcrypt');
const saltRounds = 10;
const dotenv = require('dotenv');
const multer = require('multer');
const AWS = require('aws-sdk');
const { mod } = require('prelude-ls');
const { date } = require('language-tags');

//AWS s3 관련
const imageUpload = require('../modules/s3upload').upload;
const videoupload = require('../modules/s3upload').videoUpload;
const s3 = require('../modules/s3upload').s3;

dotenv.config();

// admin login
router.post('/login', async (req, res) => {
  if (req.body.password) {
    try {
      const admin = await master.findOne({
        where: { id: 1 },
      });
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        admin.password,
      );
      if (isPasswordValid) {
        res.status(200).json({
          data: admin,
          message: '로그인 성공',
        });
      } else {
        res.status(400).json({
          data: null,
          message: '로그인 실패',
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ data: null, message: 'Error' });
    }
  } else {
    res.status(400).json({ data: null, message: '비밀번호를 입력해주세요' });
  }
});

// admin trainer countlist
router.get('/trainercount', async (req, res) => {
  try {
    const serviceStartDate = new Date('2023-05-21');
    const currentDate = new Date();

    const trainerCounts = [];
    let startDate = new Date(serviceStartDate);
    let weekcount = 1;

    while (startDate <= currentDate) {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);

      const trainerCount = await dailytrainercounts.sum('count', {
        where: {
          date: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      trainerCounts.push({
        weekend: weekcount,
        count: trainerCount || 0,
      });

      startDate.setDate(startDate.getDate() + 7);
      weekcount += 1;
    }

    res.status(200).json({
      data: { trainerCounts: trainerCounts },
      message: '일주일간의 트레이너 수',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: null, message: 'Error' });
  }
});

// admin user countlist
router.get('/usercount', async (req, res) => {
  try {
    const serviceStartDate = new Date('2023-05-21');
    const currentDate = new Date();

    const userCounts = [];
    let startDate = new Date(serviceStartDate);
    let weekcount = 1;

    while (startDate <= currentDate) {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);

      const userCount = await dailyusercounts.sum('count', {
        where: {
          date: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      userCounts.push({
        weekend: weekcount,
        count: userCount || 0,
      });

      startDate.setDate(startDate.getDate() + 7);
      weekcount += 1;
    }

    res.status(200).json({
      data: { userCounts: userCounts },
      message: '일주일간의 유저 수',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: null, message: 'Error' });
  }
});

// admin pt_request countlist
router.get('/requestcount', async (req, res) => {
  try {
    const serviceStartDate = new Date('2023-05-21');
    const currentDate = new Date();

    const requestCounts = [];
    let startDate = new Date(serviceStartDate);
    let weekcount = 1;

    while (startDate <= currentDate) {
      const endDate = new Date(startDate);
      endDate.setDate(endDate.getDate() + 6);

      const requestCount = await dailyrequestcounts.sum('count', {
        where: {
          date: {
            [Op.between]: [startDate, endDate],
          },
        },
      });

      requestCounts.push({
        weekend: weekcount,
        count: requestCount || 0,
      });

      startDate.setDate(startDate.getDate() + 7);
      weekcount += 1;
    }

    res.status(200).json({
      data: { requestCounts: requestCounts },
      message: '일주일간의 PT 요청 수',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: null, message: 'Error' });
  }
});

// admin trainer signup auth list
router.get('/trainerlist', async (req, res) => {
  try {
    const trainerlist = await trainer_sign_request.findAll({});
    res.status(200).json({
      data: trainerlist,
      message: '트레이너 회원가입 요청 목록',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: null, message: 'Error' });
  }
});

// admin trainer certification auth list
router.get('/trainer/certificatelist', async (req, res) => {
  try {
    const trainercert_list = await certification_auth_request.findAll({});
    res.status(200).json({
      data: trainercert_list,
      message: '트레이너 증명서 요청 목록',
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: null, message: 'Error' });
  }
});

// admin trainer signup auth
router.post('/trainerauth/:Id', async (req, res) => {
  try {
    const { Id } = req.params;
    const trainer_request = await trainer_sign_request.findOne({
      where: { id: Id },
    });
    if (trainer_sign_request) {
      const Trainer = await trainers.create({
        email: trainer_request.email,
        name: trainer_request.name,
        password: trainer_request.password,
        age: trainer_request.age,
        gender: trainer_request.gender,
        phonenumber: trainer_request.phonenumber,
        introduction: trainer_request.introduction,
        career: trainer_request.career,
        pt_point: trainer_request.pt_point,
      });
      const cert = await certifications.create({
        trainer_id: trainer_request.id,
        name: trainer_request.certification_name,
        image_url: trainer_request.image_url,
        certification_s3_key: trainer_request.s3_key,
      });
      const trainer_certs = await trainer_cert.create({
        trainer_id: Trainer.id,
        certification_id: cert.certification_id,
      });
      await trainer_points.create({
        trainer_id: Trainer.id,
        amount: 0,
      });
      await trainer_sign_request.destroy({ where: { id: Id } });
      res.status(200).json({ data: null, message: '승인되었습니다.' });
    } else {
      res.status(400).json({ data: null, message: '없는 트레이너 입니다.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: null, message: 'Error' });
  }
});

// admin trainer signup reject
router.post('/trainerreject/:Id', async (req, res) => {
  try {
    const { Id } = req.params;
    const trainer = await trainer_sign_request.findOne({
      where: { id: Id },
    });
    if (trainer_sign_request) {
      const s3key = trainer.s3_key;
      const deleteParams = {
        Bucket: 'fitme-s3',
        Key: s3key,
      };
      await s3.deleteObject(deleteParams).promise();
      await trainer_sign_request.destroy({
        where: { id: Id },
      });
      res.status(200).json({ data: null, message: '거절되었습니다.' });
    } else {
      res.status(400).json({ data: null, message: '없는 트레이너 입니다.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: null, message: 'Error' });
  }
});

// admin trainer certification auth
router.post('/trainer/certificateauth/:Id', async (req, res) => {
  try {
    const { Id } = req.params;
    const trainercert = await certification_auth_request.findOne({
      where: { trainer_id: Id },
    });
    if (trainercert) {
      const cert = await certifications.create({
        trainer_id: trainercert.trainer_id,
        name: trainercert.name,
        image_url: trainercert.image_url,
        certification_s3_key: trainercert.certification_s3_key,
      });
      const trainer_certs = await trainer_cert.create({
        trainer_id: trainercert.trainer_id,
        certification_id: trainercert.certification_id,
      });
      await certification_auth_request.destroy({
        where: { id: trainercert.id },
      });
      res.status(200).json({ data: null, message: '승인되었습니다.' });
    } else {
      res.status(400).json({ data: null, message: '없는 증명서 입니다.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: null, message: 'Error' });
  }
});

// admin trainer certification reject
router.post('/trainer/certificatereject/:Id', async (req, res) => {
  try {
    const { Id } = req.params;
    const trainercert = await certification_auth_request.findOne({
      where: { trainer_id: Id },
    });
    if (trainercert) {
      const s3key = trainercert.certification_s3_key;
      const deleteParams = {
        Bucket: 'fitme-s3',
        Key: s3key,
      };
      await s3.deleteObject(deleteParams).promise();
      await certification_auth_request.destroy({
        where: { id: trainercert.id },
      });
      res.status(200).json({ data: null, message: '거절되었습니다.' });
    } else {
      res.status(400).json({ data: null, message: '없는 증명서 입니다.' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: null, message: 'Error' });
  }
});

module.exports = router;
