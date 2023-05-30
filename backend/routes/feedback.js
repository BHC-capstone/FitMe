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
  feedbacks,
  comments,
} = require('../models');
const initModels = require('../models/init-models');

const models = initModels(sequelize);
const dotenv = require('dotenv');
const multer = require('multer');
const AWS = require('aws-sdk');

// AWS s3 관련
const imageUpload = require('../modules/s3upload').upload;
const videoupload = require('../modules/s3upload').videoUpload;
const { s3 } = require('../modules/s3upload');

dotenv.config();

// check feedback

///feedback/checkFeedback/1/2023.%205.%2029.
router.get('/checkFeedback/:Id/:date', async (req, res) => {
  console.log("test");
  if (req.session.loggedin) {
    try {
      const { Id, date } = req.params;
      const schedule = await schedules.findOne({
        where: { user_id: Id, date },
      });

      if(schedule.feedbacks_id != null) {
        const feedback = await feedbacks.findOne({
          where: { id: schedule.feedbacks_id },
        });
        const feedbackComment = await comments.findAll({
          where: { feedback_id: feedback.id },
          order: [['date', 'ASC']],
        });

        res.status(200).json({ data: {feedback, feedbackComment}, message: '' });
      }
      else {
        res.status(400).json({
          data: null,
          message: '해당 날짜의 피드백이 존재하지 않습니다.',
        });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json(err);
    }
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// feedback 댓글 작성
router.post('/comment/:userId/:trainerId/:id', async (req, res) => {
  if (req.session.loggedin) {
    try {
      const { id, userId, trainerId } = req.params;
      const currentdate = new Date();
      const comment = await comments.create({
        feedback_id: id,
        user_id: userId,
        trainer_id: trainerId,
        date: currentdate,
        message: req.body.message,
      });
      res.status(200).json({
        data: comment,
        message: '댓글이 작성되었습니다.',
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ data: null, message: err });
    }
  } else {
    res.status(401).json({
      data: null,
      message: '로그인이 필요합니다.',
    });
  }
});

module.exports = router;
