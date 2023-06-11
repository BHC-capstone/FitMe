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
} = require('../models');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const dotenv = require('dotenv');
const multer = require('multer');
const AWS = require('aws-sdk');

//AWS s3 관련
const imageUpload = require('../modules/s3upload').upload;
const videoupload = require('../modules/s3upload').videoUpload;
const s3 = require('../modules/s3upload').s3;

dotenv.config();

// check user meal plan
router.get('/mealplan/:userId/:date', async (req, res) => {
  if (req.session.loggedin) {
    try {
      const { userId, date } = req.params;
      const mealPlanDate = await schedules.findOne({
        where: { user_id: userId, date: date },
        attributes: ['meal_plan_id'],
      });
      const mealPlan = await meal_plan.findOne({
        where: { id: mealPlanDate.meal_plan_id },
      });
      if (mealPlan) {
        res.status(200).json({ data: mealPlan, message: '' });
      } else {
        res.status(400).json({
          data: null,
          message: '해당 날짜의 식단이 존재하지 않습니다.',
        });
      }
    } catch (err) {}
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// check user exercise routine
router.get('/exerciseroutine/:userId/:date', async (req, res) => {
  if (req.session.loggedin) {
    try {
      const { userId, date } = req.params;
      const schedule_date = await schedules.findOne({
        where: { user_id: userId, date: date },
      });
      if (schedule_date != null) {
        const exerciseRoutine = await exercise_routines.findAll({
          where: { schedule_id: schedule_date.id },
        });
        if (exerciseRoutine) {
          res.status(200).json({ data: exerciseRoutine, message: '' });
        } else {
          res.status(400).json({
            data: null,
            message: '해당 날짜의 운동루틴이 존재하지 않습니다.',
          });
        }
      } else {
        res.status(400).json({
          data: null,
          message: '해당 날짜의 운동루틴이 존재하지 않습니다.',
        });
      }
    } catch (err) {}
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// meal_plan 작성
router.post('/createMealplan/:date/:userId/:id', async (req, res) => {
  if (req.session.loggedin) {
    try {
      const { id, userId, date } = req.params;
      let schedule = await schedules.findOne({
        where: { user_id: userId, date: date },
      });
      if (!schedule) {
        schedule = await schedules.create({
          trainer_id: id,
          user_id: userId,
          date: date,
        });
      }
      const mealPlan = await meal_plan.create({
        user_id: userId,
        trainer_id: id,
        breakfast: req.body.breakfast,
        lunch: req.body.lunch,
        dinner: req.body.dinner,
      });
      await schedule.update({ meal_plan_id: mealPlan.id });
      res.status(200).json({
        data: mealPlan,
        message: '식단이 생성되었습니다.',
      });
    } catch (err) {}
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// exercise_routine 추가
router.post('/createExercise/:date/:id/:userId', async (req, res) => {
  if (req.session.loggedin) {
    try {
      const { userId, id, date } = req.params;
      let schedule = await schedules.findOne({
        where: { user_id: userId, date: date },
      });
      if (!schedule) {
        schedule = await schedules.create({
          trainer_id: id,
          user_id: userId,
          date: date,
        });
      }
      const exerciseRoutine = await exercise_routines.create({
        schedule_id: schedule.id,
        user_id: userId,
        trainer_id: id,
      });
      res.status(200).json({
        data: exerciseRoutine,
        message: '운동루틴 추가가 완료되었습니다.',
      });
    } catch (err) {
      res.status(500).json({ data: null, message: err });
    }
  } else {
    res.status(401).json({
      data: null,
      message: '로그인이 필요합니다.',
    });
  }
});

// exercise routine 수정완료
router.put('/updateExercise/:exerciseId', async (req, res) => {
  if (req.session.loggedin) {
    try {
      const { exerciseId } = req.params;
      const exerciseRoutine = await exercise_routines.findOne({
        where: { id: exerciseId },
      });
      if (!exerciseRoutine) {
        res.status(404).json({
          data: null,
          message: '운동루틴을 찾을 수 없습니다.',
        });
        return;
      }
      await exercise_routines.update(
        {
          name: req.body.name,
          content: req.body.content,
          set_count: req.body.set_count,
          exercise_count: req.body.exercise_count,
        },
        { where: { id: exerciseId } },
      );
      res.status(200).json({
        data: null,
        message: '운동루틴이 수정되었습니다.',
      });
    } catch (err) {
      res.status(500).json({ data: null, message: err });
    }
  } else {
    res.status(401).json({
      data: null,
      message: '로그인이 필요합니다.',
    });
  }
});

//exercise routine 삭제
router.delete('/deleteExercise/:exerciseId', async (req, res) => {
  if (req.session.loggedin) {
    try {
      const { exerciseId } = req.params;
      const exerciseRoutine = await exercise_routines.findOne({
        where: { id: exerciseId },
      });
      if (!exerciseRoutine) {
        res.status(404).json({
          data: null,
          message: '운동루틴을 찾을 수 없습니다.',
        });
        return;
      }
      const s3Key = exerciseRoutine.guide_s3_key;
      if (s3Key) {
        const deleteParams = {
          Bucket: 'fitme-s3',
          Key: s3Key,
        };
        await s3.deleteObject(deleteParams).promise();
      }
      await exercise_routines.destroy({
        where: { id: exerciseId },
      });
      res.status(200).json({
        data: null,
        message: '운동루틴이 삭제되었습니다.',
      });
    } catch (err) {
      res.status(500).json({ data: null, message: err });
    }
  } else {
    res.status(401).json({
      data: null,
      message: '로그인이 필요합니다.',
    });
  }
});

// upload exerciseroutine guide video
router.put(
  '/uplodadGuideVideo/:id/:exerciseId',
  videoupload.single('video'),
  async (req, res) => {
    if (req.session.loggedin) {
      try {
        const { exerciseId, id } = req.params;
        const exerciseRoutine = await exercise_routines.findOne({
          where: { id: exerciseId },
        });
        if (!exerciseRoutine) {
          return res.status(400).json({
            data: null,
            message: '해당 운동 루틴이 존재하지 않습니다.',
          });
        }
        const uploadParams = {
          acl: 'public-read',
          ContentType: req.file.mimetype,
          Bucket: 'fitme-s3',
          Body: req.file.buffer,
          Key: `exerciseroutine/${id}/${exerciseId}`,
        };
        const result = await s3.upload(uploadParams).promise();
        await exercise_routines.update(
          {
            guide_video_url: result.Location,
            guide_s3_key: result.Key,
          },
          {
            where: { id: exerciseId },
          },
        );

        res.status(200).json({
          data: null,
          message: '가이드영상 업로드가 완료되었습니다.',
        });
      } catch (err) {
        res.status(500).json({
          data: null,
          message: '서버 오류가 발생했습니다.',
        });
      }
    } else {
      res.status(401).json({
        data: null,
        message: '로그인이 필요합니다.',
      });
    }
  },
);

// gudie video delete
router.delete('/deleteGuidevideo/:exerciseId', async (req, res) => {
  if (req.session.loggedin) {
    try {
      const { exerciseId } = req.params;
      const exerciseRoutine = await exercise_routines.findOne({
        where: { id: exerciseId },
      });
      if (!exerciseRoutine) {
        res.status(404).json({
          data: null,
          message: '운동루틴을 찾을 수 없습니다.',
        });
        return;
      }
      const s3Key = exerciseRoutine.guide_s3_key;
      const deleteParams = {
        Bucket: 'fitme-s3',
        Key: s3Key,
      };
      await s3.deleteObject(deleteParams).promise();
      await exercise_routines.update(
        {
          guide_video_url: null,
          guide_s3_key: null,
        },
        { where: { id: exerciseId } },
      );
      res.status(200).json({
        data: null,
        message: '운동루틴이 삭제되었습니다.',
      });
    } catch (err) {
      res.status(500).json({ data: null, message: err });
    }
  } else {
    res.status(401).json({
      data: null,
      message: '로그인이 필요합니다.',
    });
  }
});

// guide video update
router.put(
  '/updateGuidevideo/:exerciseId',
  videoupload.single('video'),
  async (req, res) => {
    if (req.session.loggedin) {
      try {
        const { exerciseId } = req.params;
        const exerciseRoutine = await exercise_routines.findOne({
          where: { id: exerciseId },
        });
        if (!exerciseRoutine) {
          res.status(404).json({
            data: null,
            message: '운동루틴을 찾을 수 없습니다.',
          });
          return;
        }
        if (req.file != null) {
          const s3Key = exerciseRoutine.guide_s3_key;
          const deleteParams = {
            Bucket: 'fitme-s3',
            Key: s3Key,
          };
          await s3.deleteObject(deleteParams).promise();
          const uploadParams = {
            acl: 'public-read',
            ContentType: req.file.mimetype,
            Bucket: 'fitme-s3',
            Body: req.file.buffer,
            Key: `exerciseroutine/${id}/${exerciseId}`,
          };
          const result = await s3.upload(uploadParams).promise();
          await exercise_routines.update(
            {
              guide_video_url: result.Location,
              guide_s3_key: result.Key,
            },
            { where: { id: exerciseId } },
          );
          res.status(200).json({
            data: null,
            message: '가이드 비디오가 수정되었습니다.',
          });
        } else {
          res.status(404).json({
            data: null,
            message: '업로드된 영상이 없습니다.',
          });
          return;
        }
      } catch (err) {
        res.status(500).json({ data: null, message: err });
      }
    } else {
      res.status(401).json({
        data: null,
        message: '로그인이 필요합니다.',
      });
    }
  },
);

// feedback 작성
router.post('/createFeedback/:date/:id/:userId', async (req, res) => {
  const currentdate = new Date();
  const year = currentdate.getFullYear();
  const month = currentdate.getMonth() + 1;
  const day = currentdate.getDate();
  const newdate = year + '-' + month + '-' + day;
  if (req.session.loggedin) {
    try {
      const { userId, id, date } = req.params;
      let schedule = await schedules.findOne({
        where: { user_id: userId, date: date },
      });
      if (!schedule) {
        schedule = await schedules.create({
          trainer_id: id,
          user_id: userId,
          date: date,
        });
      }
      const Feedback = await feedbacks.create({
        schedule_id: schedule.id,
        user_id: userId,
        trainer_id: id,
        date: newdate,
      });
      await schedules.update(
        {
          feedbacks_id: Feedback.id,
        },
        { where: { id: schedule.id } },
      );
      const count = await trainer_manage.findOne({
        where: { user_id: userId, trainer_id: id },
      });
      await trainer_manage.update(
        {
          remain_pt_count: count.remain_pt_count - 1,
        },
        { where: { user_id: userId, trainer_id: id } },
      );
      res.status(200).json({
        data: Feedback,
        message: '피드백 업로드가 완료되었습니다.',
      });
    } catch (err) {
      res.status(500).json({ data: null, message: err });
    }
  } else {
    res.status(401).json({
      data: null,
      message: '로그인이 필요합니다.',
    });
  }
});

// feedback 수정
router.put('/updateFeedback/:feedbackId', async (req, res) => {
  if (req.session.loggedin) {
    try {
      const { feedbackId } = req.params;
      const Feedback = await feedbacks.findOne({
        where: { id: feedbackId },
      });
      if (!Feedback) {
        res.status(404).json({
          data: null,
          message: '피드백을 찾을 수 없습니다.',
        });
        return;
      }
      await feedbacks.update(
        {
          feedback_message: req.body.feedback_message,
        },
        { where: { id: feedbackId } },
      );
      res.status(200).json({
        data: null,
        message: '피드백이 수정되었습니다.',
      });
    } catch (err) {
      res.status(500).json({ data: null, message: err });
    }
  } else {
    res.status(401).json({
      data: null,
      message: '로그인이 필요합니다.',
    });
  }
});

// feedback 삭제
router.delete('/deleteFeedback/:feedbackId', async (req, res) => {
  if (req.session.loggedin) {
    try {
      const { feedbackId } = req.params;
      const Feedback = await feedbacks.findOne({
        where: { id: feedbackId },
      });
      if (!Feedback) {
        res.status(404).json({
          data: null,
          message: '피드백을 찾을 수 없습니다.',
        });
        return;
      }
      const s3Key = Feedback.s3_key;
      if (s3Key) {
        const deleteParams = {
          Bucket: 'fitme-s3',
          Key: s3Key,
        };
        await s3.deleteObject(deleteParams).promise();
      }
      await Feedback.destroy({
        where: { id: feedbackId },
      });
      res.status(200).json({
        data: null,
        message: '피드백이 삭제되었습니다.',
      });
    } catch (err) {
      res.status(500).json({ data: null, message: err });
    }
  } else {
    res.status(401).json({
      data: null,
      message: '로그인이 필요합니다.',
    });
  }
});

// feedback video 업로드
router.post(
  '/uploadFeedbackvideo/:date/:id/:userId',
  videoupload.single('video'),
  async (req, res) => {
    if (req.session.loggedin) {
      try {
        const { userId, id, date } = req.params;
        let schedule = await schedules.findOne({
          where: { user_id: userId, date: date },
        });
        if (schedule != null) {
          const Feedback = await feedbacks.findOne({
            where: { id: schedule.feedbacks_id },
          });
          const uploadParams = {
            acl: 'public-read',
            ContentType: req.file.mimetype,
            Bucket: 'fitme-s3',
            Body: req.file.buffer,
            Key: `feedbacks/${id}/${Feedback.id}`,
          };
          const result = await s3.upload(uploadParams).promise();
          await feedbacks.update(
            {
              feedback_video_url: result.Location,
              s3_key: result.Key,
            },
            { where: { id: Feedback.id } },
          );
          res.status(200).json({
            data: Feedback,
            message: '피드백 영상 업로드가 완료되었습니다.',
          });
        } else {
          res.status(404).json({
            data: null,
            message: '피드백을 찾을 수 없습니다.',
          });
          return;
        }
      } catch (err) {
        res.status(500).json({ data: null, message: err });
      }
    } else {
      res.status(401).json({
        data: null,
        message: '로그인이 필요합니다.',
      });
    }
  },
);

// feedback 영상 삭제
router.delete('/deleteFeedbackvideo/:feedbackId', async (req, res) => {
  if (req.session.loggedin) {
    try {
      const { feedbackId } = req.params;
      const Feedback = await feedbacks.findOne({
        where: { id: feedbackId },
      });
      if (!Feedback) {
        res.status(404).json({
          data: null,
          message: '피드백을 찾을 수 없습니다.',
        });
        return;
      }
      const s3Key = Feedback.s3_key;
      if (s3Key) {
        const deleteParams = {
          Bucket: 'fitme-s3',
          Key: s3Key,
        };
        await s3.deleteObject(deleteParams).promise();
      }
      res.status(200).json({
        data: null,
        message: '피드백 영상이 삭제되었습니다.',
      });
    } catch (err) {
      res.status(500).json({ data: null, message: err });
    }
  } else {
    res.status(401).json({
      data: null,
      message: '로그인이 필요합니다.',
    });
  }
});

// feedback 영상 수정
router.put(
  '/updateFeedbackvideo/:feedbackId',
  videoupload.single('video'),
  async (req, res) => {
    if (req.session.loggedin) {
      try {
        const { feedbackId } = req.params;
        const Feedback = await feedbacks.findOne({
          where: { id: feedbackId },
        });
        if (!Feedback) {
          res.status(404).json({
            data: null,
            message: '피드백을 찾을 수 없습니다.',
          });
          return;
        }
        if (req.file != null) {
          const s3Key = Feedback.s3_key;
          if (s3Key != null) {
            const deleteParams = {
              Bucket: 'fitme-s3',
              Key: s3Key,
            };
            await s3.deleteObject(deleteParams).promise();
          }
          const uploadParams = {
            acl: 'public-read',
            ContentType: req.file.mimetype,
            Bucket: 'fitme-s3',
            Body: req.file.buffer,
            Key: `feedbacks/${Feedback.id}`,
          };
          const result = await s3.upload(uploadParams).promise();
          await feedbacks.update(
            {
              feedback_video_url: result.Location,
              s3_key: result.Key,
            },
            { where: { id: feedbackId } },
          );
          res.status(200).json({
            data: null,
            message: '피드백 비디오가 수정되었습니다.',
          });
        } else {
          res.status(404).json({
            data: null,
            message: '업로드된 영상이 없습니다.',
          });
          return;
        }
      } catch (err) {
        res.status(500).json({ data: null, message: err });
      }
    } else {
      res.status(401).json({
        data: null,
        message: '로그인이 필요합니다.',
      });
    }
  },
);

module.exports = router;
