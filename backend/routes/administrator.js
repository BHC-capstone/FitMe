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

// admin trainer,user,pt_request list
router.get('/', async (req, res) => {
  try {
    const currentDate = new Date();
    const trainerCount = await trainers.count();
    const userCount = await users.count();
    const ptRequestCount = await pt_requests.count();

    const adminStatistics = await AdminStatistics.create({
      trainer_count: trainerCount,
      user_count: userCount,
      pt_request_count: ptRequestCount,
      date: currentDate,
    });

    res.status(200).json({
      data: adminStatistics,
      message: '당일 트레이너, 유저, 피티요청 수',
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
router.post('/trainer', async (req, res) => {
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
router.post('/trainer', async (req, res) => {
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
router.post('/trainer/certificate', async (req, res) => {
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
router.post('/trainer/certificate', async (req, res) => {
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
