var express = require('express');
var router = express.Router();
const { sequelize } = require('../models');
const { trainers, users, pt_requests, exercise_routines, schedules, trainer_manage, meal_plan } = require('../models');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const dotenv = require('dotenv');
const multer = require('multer');
const AWS = require('aws-sdk');

//AWS s3 관련
const imageUpload = require('../modules/s3upload').upload;
const s3 = require('../modules/s3upload').s3;

dotenv.config();

// meal_plan 생성
router.post('/createmealplan/:date/:user_id/:id', async (req, res) => {
       // if (req.session.loggedin) {
    try {
        const {id, user_id, date} = req.params;
        const mealPlan = await meal_plan.create({
        user_id: user_id,
        trainer_id: id,
        breakfast: req.body.breakfast,
        lunch: req.body.lunch,
        dinner: req.body.dinner,
        });
        const schedule = await schedules.findOne({
        where: { trainer_id: id, date: date },
        });
        if (!schedule) {
            await schedules.create({
            trainer_id: id,
            user_id: user_id,
            date: date,
            });
            console.log("schedule created");
        }
        else { await schedule.update({ meal_plan_id: mealPlan.id });
        console.log("schedule updated");
        }
        res.status(200).json({ data: mealPlan, message: '식단이 생성되었습니다' });
    } catch (err) {
        console.log(err);
    }
    //    } else {
    //    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
      //  }
});

// exercise_routine 생성
router.post('/createexerciseroutine/:date/:user_id/:id', async (req, res) => {
    // if (req.session.loggedin) {
    try {
        const {id, user_id, date} = req.params;
        const schedule = await schedules.findOne({
            where: { trainer_id: id, date: date },
            });
            if (!schedule) {
                await schedules.create({
                trainer_id: req.params.id,
                user_id: req.params.user_id,
                date: req.params.date,
                });
                console.log("schedule created");
            }
        const exerciseRoutine = await exercise_routines.create({
        schedule_id: schedule.id,
        user_id: req.params.user_id,
        trainer_id: req.params.id,
        name: req.body.exercise_name,
        content: req.body.content,
        set_count: req.body.set_count,
        exercise_count: req.body.exercise_count,
        });
        res.status(200).json({ data: exerciseRoutine, message: '운동 루틴이 생성되었습니다' });
        }
        catch (err) {
        console.log(err);
    }
    //    } else {
    //    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
    //    }
});



module.exports = router;