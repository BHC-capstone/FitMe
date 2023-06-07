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
const models = initModels(sequelize);
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

// admin trainer countlist
router.get('/trainercount', async (req, res) => {
  try {
    const serviceStartDate = new Date('서비스 시작 날짜');
    const currentDate = new Date();

    const trainerCounts = [];
    let startDate = new Date(serviceStartDate);

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

      if (!trainerCount) {
        trainerCount = 0;
      }

      trainerCounts.push({
        startDate: startDate,
        endDate: endDate,
        count: trainerCount,
      });
      startDate.setDate(startDate.getDate() + 7); // 다음 주의 시작 날짜로 이동
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
    const serviceStartDate = new Date('서비스 시작 날짜');
    const currentDate = new Date();

    const userCounts = [];
    let startDate = new Date(serviceStartDate);

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

      if (!userCount) {
        userCount = 0;
      }

      userCounts.push({
        startDate: startDate,
        endDate: endDate,
        count: userCount,
      });
      startDate.setDate(startDate.getDate() + 7); // 다음 주의 시작 날짜로 이동
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
    const serviceStartDate = new Date('서비스 시작 날짜');
    const currentDate = new Date();

    const requestCounts = [];
    let startDate = new Date(serviceStartDate);

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

      if (!requestCount) {
        requestCount = 0;
      }

      requestCounts.push({
        startDate: startDate,
        endDate: endDate,
        count: requestCount,
      });
      startDate.setDate(startDate.getDate() + 7); // 다음 주의 시작 날짜로 이동
    }
    res.status(200).json({
      data: { requestCounts: requestCounts },
      message: '일주일간의 pt 요청 수',
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
    const trainer = await trainer_sign_request.findOne({
      where: { id: Id },
    });
    if (trainer_sign_request) {
      const Trainer = await trainers.create({
        email: trainer.email,
        name: trainer.name,
        password: trainer.password,
        age: trainer.age,
        gender: trainer.gender,
        phonenumber: trainer.phonenumber,
        introduction: trainer.introduction,
        career: trainer.career,
        pt_point: trainer.pt_point,
      });
      await trainer_points.create({
        trainer_id: Trainer.id,
        amount: 0,
      });
      await certification_auth_request.update(
        { trainer_id: Trainer.id },
        { where: { trainer_request_id: Id } },
      );
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
      await trainer_sign_request.destroy({
        where: { id: Id },
      });
      await certification_auth_request.destroy({
        where: { trainer_request_id: Id },
      });
      res.status(200).json({ data: null, message: '승인되었습니다.' });
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
      await certifications.update({
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
      res.status(200).json({ data: null, message: '거절되었습니다.' });
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
