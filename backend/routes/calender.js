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
} = require("../models");
const initModels = require("../models/init-models");
const models = initModels(sequelize);
const dotenv = require("dotenv");
const multer = require("multer");
const AWS = require("aws-sdk");

//AWS s3 관련
const imageUpload = require("../modules/s3upload").upload;
const videoupload = require("../modules/s3upload").videoUpload;
const s3 = require("../modules/s3upload").s3;

dotenv.config();

// check meal plan
router.get("/mealplan/:id/:date", async (req, res) => {
    if (req.session.loggedin) {
        try {
            const { id, date } = req.params;
            const mealPlanDate = await schedules.findOne({
                where: { user_id: id, date: date },
                attributes: ["meal_plan_id"],
            });
            const mealPlan = await meal_plan.findOne({
                where: { id: mealPlanDate.meal_plan_id },
            });
            if (mealPlan) {
                res.status(200).json({ data: mealPlan, message: "" });
            } else {
                res.status(400).json({
                    data: null,
                    message: "해당 날짜의 식단이 존재하지 않습니다.",
                });
            }
        } catch (err) {
            res.status(500).json({ data: null, message: err });
            console.log(err);
        }
    } else {
        res.status(401).json({ data: null, message: "로그인이 필요합니다." });
    }
});

// check exercise routine
router.get("/exerciseroutine/:id/:date", async (req, res) => {
    //  if (req.session.loggedin) {
    try {
        const { id, date } = req.params;
        console.log("test" + date + date);
        const schedule_date = await schedules.findOne({
            where: { user_id: id, date: date },
        });

        const exerciseRoutine = await exercise_routines.findAll({
            where: { schedule_id: schedule_date.id },
        });
        console.log(exerciseRoutine);
        if (exerciseRoutine) {
            res.status(200).json({ data: exerciseRoutine, message: "" });
        } else {
            res.status(400).json({
                data: null,
                message: "해당 날짜의 운동루틴이 존재하지 않습니다.",
            });
        }
    } catch (err) {
        console.log(err);
    }
    //  } else {
    //     res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
    //  }
});

// upload mealplan picture
router.post(
    "/mealpicture/:id/:date/:meal",
    imageUpload.single("img"),
    async (req, res) => {
        if (req.session.loggedin) {
            try {
                const { id, date } = req.params;

                const trainer = await trainer_manage.findOne({
                    where: { user_id: id },
                });

                const mealPlanDate = await schedules.findOne({
                    where: { user_id: id, date: date },
                    attributes: ["meal_plan_id"],
                });

                if (!mealPlanDate) {
                    return res.status(400).json({
                        data: null,
                        message: "해당 날짜의 식단이 존재하지 않습니다.",
                    });
                }

                const mealPlan = await meal_plan.findOne({
                    where: { id: mealPlanDate.meal_plan_id },
                });

                if (!mealPlan) {
                    return res.status(400).json({
                        data: null,
                        message: "해당 식단이 존재하지 않습니다.",
                    });
                }

                console.log(req.file);
                const uploadParams = {
                    acl: "public-read",
                    ContentType: "image/png",
                    Bucket: "fitme-s3",
                    Body: req.file.buffer,
                    Key:
                        `mealplan/` +
                        trainer.trainer_id +
                        `/${req.params.id}/` +
                        req.file.originalname,
                };

                const result = await s3.upload(uploadParams).promise();

                if (req.params.meal === "breakfast") {
                    await meal_plan.update(
                        {
                            breakfast_image_url: result.Location,
                            breakfast_s3_key: result.Key,
                        },
                        {
                            where: { id: mealPlan.id },
                        }
                    );
                } else if (req.params.meal === "lunch") {
                    await meal_plan.update(
                        {
                            lunch_image_url: result.Location,
                            lunch_s3_key: result.Key,
                        },
                        {
                            where: { id: mealPlan.id },
                        }
                    );
                } else if (req.params.meal === "dinner") {
                    await meal_plan.update(
                        {
                            dinner_image_url: result.Location,
                            dinner_s3_key: result.Key,
                        },
                        {
                            where: { id: mealPlan.id },
                        }
                    );
                }

                res.status(200).json({
                    data: null,
                    message: "식사 사진 업로드가 완료되었습니다.",
                });
            } catch (err) {
                console.log(err);
            }
        } else {
            res.status(401).json({
                data: null,
                message: "로그인이 필요합니다.",
            });
        }
    }
);

// upload exerciseroutine video
router.post(
    "/exercisevideo/:id/:routineid",
    videoupload.single("video"),
    async (req, res) => {
        if (req.session.loggedin) {
            try {
                const { routineid, id } = req.params;
                const exerciseRoutine = await exercise_routines.findOne({
                    where: { id: routineid },
                });

                if (!exerciseRoutine) {
                    return res.status(400).json({
                        data: null,
                        message: "해당 운동 루틴이 존재하지 않습니다.",
                    });
                }

                const uploadParams = {
                    acl: "public-read",
                    ContentType: req.file.mimetype,
                    Bucket: "fitme-s3",
                    Body: req.file.buffer,
                    Key: `exerciseroutine/${id}/${routineid}/${req.file.originalname}`,
                };

                const result = await s3.upload(uploadParams).promise();

                await exercise_routines.update(
                    {
                        user_video_url: result.Location,
                        user_s3_key: result.Key,
                    },
                    {
                        where: { id: routineid },
                    }
                );

                res.status(200).json({
                    data: null,
                    message: "운동영상 업로드가 완료되었습니다.",
                });
            } catch (err) {
                console.log(err);
                res.status(500).json({
                    data: null,
                    message: "서버 오류가 발생했습니다.",
                });
            }
        } else {
            res.status(401).json({
                data: null,
                message: "로그인이 필요합니다.",
            });
        }
    }
);

module.exports = router;
