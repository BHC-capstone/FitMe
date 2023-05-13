var express = require('express');
var router = express.Router();
const { trainers } = require('../models');
const { users } = require('../models');
const { pt_requests } = require('../models');
const { exercise_routine, schedules, trainer_manage } = require('../models');
const { meal_plan } = require('../models');
const dotenv = require('dotenv');
const multer = require('multer');
const AWS = require('aws-sdk');

//AWS s3 관련
const imageUpload = require('../modules/s3upload').upload;
const s3 = require('../modules/s3upload').s3;

dotenv.config();

// check meal plan
router.get('/mealplan/:id/:date', async (req, res) => {
  //    if (req.session.loggedin) {
  try {
    const { id, date } = req.params;
    const mealPlanDate = await schedules.findOne({
      where: { user_id: id, date: date },
      attributes: ['meal_plan_id'],
    });
    const mealPlan = await meal_plan.findOne({
      where: { id: mealPlanDate.meal_plan_id },
    });
    if (mealPlan) {
      res.status(200).json({ data: mealPlan, message: '' });
    } else {
      res
        .status(400)
        .json({ data: null, message: '해당 날짜의 식단이 존재하지 않습니다.' });
    }
  } catch (err) {
    console.log(err);
  }
  //    } else {
  //      res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  //    }
});

// check exercise routine
router.get('/exerciseroutine/:id/:date', async (req, res) => {
  //    if (req.session.loggedin) {
  try {
    const { id, date } = req.params;
    const exerciseRoutineDate = await schedules.findOne({
      where: { user_id: id, date: date },
      attributes: ['routine_id'],
    });
    const exerciseRoutine = await exercise_routine.findOne({
      where: { id: exerciseRoutineDate.routine_id },
    });
    if (exerciseRoutine) {
      res.status(200).json({ data: exerciseRoutine, message: '' });
    } else {
      res.status(400).json({
        data: null,
        message: '해당 날짜의 운동루틴이 존재하지 않습니다.',
      });
    }
  } catch (err) {
    console.log(err);
  }
  //    } else {
  //      res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  //    }
});

// upload mealplan picture
router.post(
  '/mealpicture/:id/:date/:meal',
  imageUpload.single('img'),
  async (req, res) => {
    //    if (req.session.loggedin) {
    try {
      const { id, date } = req.params;

      const trainer = await trainer_manage.findOne({
        where: { user_id: id },
      });

      console.log(trainer);

      const mealPlanDate = await schedules.findOne({
        where: { user_id: id, date: date },
        attributes: ['meal_plan_id'],
      });

      if (!mealPlanDate) {
        return res.status(400).json({
          data: null,
          message: '해당 날짜의 식단이 존재하지 않습니다.',
        });
      }

      const mealPlan = await meal_plan.findOne({
        where: { id: mealPlanDate.meal_plan_id },
      });

      if (!mealPlan) {
        return res
          .status(400)
          .json({ data: null, message: '해당 식단이 존재하지 않습니다.' });
      }

      const uploadParams = {
        acl: 'public-read',
        ContentType: 'image/png',
        Bucket: 'fitme-s3',
        Body: req.file.buffer,
        Key:
          `mealplan/` +
          trainer.trainer_id +
          `/${req.params.id}/` +
          req.file.originalname,
      };

      const result = await s3.upload(uploadParams).promise();

      if (req.params.meal === 'breakfast') {
        await meal_plan.update(
          {
            breakfast_image_url: result.Location,
          },
          {
            where: { id: mealPlan.id },
          }
        );
      } else if (req.params.meal === 'lunch') {
        await meal_plan.update(
          {
            lunch_image_url: result.Location,
          },
          {
            where: { id: mealPlan.id },
          }
        );
      } else if (req.params.meal === 'dinner') {
        await meal_plan.update(
          {
            dinner_image_url: result.Location,
          },
          {
            where: { id: mealPlan.id },
          }
        );
      }

      res
        .status(200)
        .json({ data: null, message: '식사 사진 업로드가 완료되었습니다.' });
    } catch (err) {
      console.log(err);
    }
    //    } else {
    //      res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
    //    }
  }
);

// upload exerciseroutine video
router.post(
  '/exercisevideo/:id',
  imageUpload.fields([{ name: 'video', maxCount: 1 }]),
  async (req, res) => {
    //        if (req.session.loggedin) {
    try {
      const { id, date } = req.params;
      const exerciseRoutineDate = await schedules.findOne({
        where: { user_id: id, date: date },
        attributes: ['routine_id'],
      });

      if (!exerciseRoutineDate) {
        return res.status(400).json({
          data: null,
          message: '해당 날짜의 운동루틴이 존재하지 않습니다.',
        });
      }

      const exerciseRoutine = await exercise_routine.findOne({
        where: { id: exerciseRoutineDate.routine_id },
      });

      if (!exerciseRoutine) {
        return res
          .status(400)
          .json({ data: null, message: '해당 운동루틴이 존재하지 않습니다.' });
      }

      const exerciseRoutineId = exerciseRoutine.id;
      const videoUrl = req.files.video ? req.files.video[0].path : null;

      await exercise_routine.update(
        {
          user_video_url: videoUrl,
        },
        {
          where: { id: exerciseRoutineId },
        }
      );

      res
        .status(200)
        .json({ data: null, message: '운동 영상 업로드가 완료되었습니다.' });
    } catch (err) {
      console.log(err);
    }
    //        } else {
    //            res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
    //        }
  }
);

module.exports = router;
