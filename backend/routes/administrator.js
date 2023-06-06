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
  AdminStatistics,
} = require("../models");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const dotenv = require("dotenv");
const multer = require("multer");
const AWS = require("aws-sdk");
const { mod } = require("prelude-ls");
const certifications = require("../models/certifications");
const { date } = require("language-tags");

//AWS s3 관련
const imageUpload = require("../modules/s3upload").upload;
const videoupload = require("../modules/s3upload").videoUpload;
const s3 = require("../modules/s3upload").s3;

dotenv.config();

// admin trainer,user,pt_request list
router.get("/", async (req, res) => {
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
      message: "당일 트레이너, 유저, 피티요청 수",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: null, message: "Error" });
  }
});

// admin trainer signup auth list
router.get("/trainerlist", async (req, res) => {
  try {
    const trainer = await trainers.findAll({
      where: { trainer_auth: 0 },
      attributes: ["trainer_id", "trainer_name", "trainer_email"],
    });
    res.status(200).json({
      data: trainer,
      message: "트레이너 회원가입 요청 목록",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: null, message: "Error" });
  }
});

// admin trainer certification auth list
router.get("/trainer/certificatelist", async (req, res) => {
  try {
    const trainercert = await certifications.findAll({
      where: { trainer_certification_auth: 0 },
    });
    res.status(200).json({
      data: trainercert,
      message: "트레이너 증명서 요청 목록",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: null, message: "Error" });
  }
});

// admin trainer signup auth
router.post("/trainer", async (req, res) => {
  try {
    const { trainer_id } = req.params;
    const trainer = await trainers.findOne({
      where: { trainer_id: trainer_id },
    });
    if (trainer) {
      await trainers.update(
        { trainer_auth: 1 },
        { where: { trainer_id: trainer_id } }
      );
      res.status(200).json({ data: null, message: "승인되었습니다." });
    } else {
      res.status(400).json({ data: null, message: "없는 트레이너 입니다." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: null, message: "Error" });
  }
});

// admin trainer certification auth
router.post("/trainer/certificate", async (req, res) => {
  try {
    const { trainer_certification_id } = req.params;
    const trainercert = await certifications.findOne({
      where: { trainer_certification_id: trainer_certification_id },
    });
    if (trainercert) {
      await certifications.update(
        { trainer_certification_auth: 1 },
        { where: { trainer_certification_id: trainer_certification_id } }
      );
      res.status(200).json({ data: null, message: "승인되었습니다." });
    } else {
      res.status(400).json({ data: null, message: "없는 증명서 입니다." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ data: null, message: "Error" });
  }
});

module.exports = router;
