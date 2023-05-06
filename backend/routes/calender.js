var express = require('express');
var router = express.Router();
const { trainers } = require('../models');
const { users } = require('../models');
const { pt_requests } = require('../models');
const { exercise_routine } = require('../models');
const { meal_plan } = require('../models');
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
const multer = require('multer');
const AWS = require('aws-sdk');

//AWS s3 관련
dotenv.config();
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'fitme-s3',
    acl: 'public-read',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  }),
});


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
          where: { id: mealPlanDate.meal_plan_id},
        });
        if (mealPlan) {
          res.status(200).json({ data: mealPlan, message: '' });
        } else {
          res.status(400).json({ data: null, message: '해당 날짜의 식단이 존재하지 않습니다.' });
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
          res.status(400).json({ data: null, message: '해당 날짜의 운동루틴이 존재하지 않습니다.' });
        }
      } catch (err) {
        console.log(err);
      }
//    } else {
//      res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
//    }
  }
);

// upload mealplan picture
router.post('/mealpicture/:id', upload.fields([
    { name: 'breakfast', maxCount: 1 },
    { name: 'lunch', maxCount: 1 },
    { name: 'dinner', maxCount: 1 },
  ]), async (req, res) => {
//    if (req.session.loggedin) {
      try {
        const { id, date } = req.params;
        const mealPlanDate = await schedules.findOne({
          where: { user_id: id, date: date },
          attributes: ['meal_plan_id'],
        });
  
        if (!mealPlanDate) {
          return res.status(400).json({ data: null, message: '해당 날짜의 식단이 존재하지 않습니다.' });
        }
  
        const mealPlan = await meal_plan.findOne({
          where: { id: mealPlanDate.meal_plan_id },
        });
  
        if (!mealPlan) {
          return res.status(400).json({ data: null, message: '해당 식단이 존재하지 않습니다.' });
        }
  
        const mealPlanId = mealPlan.id;
        const breakfastImgUrl = req.files.breakfast ? req.files.breakfast[0].path : null;
        const lunchImgUrl = req.files.lunch ? req.files.lunch[0].path : null;
        const dinnerImgUrl = req.files.dinner ? req.files.dinner[0].path : null;
  
        await meal_plan.update({
          breakfast_image: breakfastImgUrl,
          lunch_image: lunchImgUrl,
          dinner_image: dinnerImgUrl,
        }, {
          where: { id: mealPlanId },
        });
  
        res.status(200).json({ data: null, message: '식사 사진 업로드가 완료되었습니다.' });
      } catch (err) {
        console.log(err);
      }
//    } else {
//      res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
//    }
  });
  
    // upload exerciseroutine video
    router.post('/exercisevideo/:id', upload.fields([
        { name: 'video', maxCount: 1 },
        ]), async (req, res) => {
//        if (req.session.loggedin) {
            try {
            const { id, date } = req.params;
            const exerciseRoutineDate = await schedules.findOne({
                where: { user_id: id, date: date },
                attributes: ['routine_id'],
            });
        
            if (!exerciseRoutineDate) {
                return res.status(400).json({ data: null, message: '해당 날짜의 운동루틴이 존재하지 않습니다.' });
            }
        
            const exerciseRoutine = await exercise_routine.findOne({
                where: { id: exerciseRoutineDate.routine_id },
            });
        
            if (!exerciseRoutine) {
                return res.status(400).json({ data: null, message: '해당 운동루틴이 존재하지 않습니다.' });
            }
        
            const exerciseRoutineId = exerciseRoutine.id;
            const videoUrl = req.files.video ? req.files.video[0].path : null;
        
            await exercise_routine.update({
                user_video_url : videoUrl,
            }, {
                where: { id: exerciseRoutineId },
            });
        
            res.status(200).json({ data: null, message: '운동 영상 업로드가 완료되었습니다.' });
            } catch (err) {
            console.log(err);
            }
//        } else {
//            res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
//        }
        }
    );