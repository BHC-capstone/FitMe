var express = require('express');
var router = express.Router();
const { sequelize } = require('../models');
const {
  users,
  trainers,
  pt_requests,
  trainer_manage,
  bodycheck,
  user_points,
  dailyrequestcounts,
} = require('../models');
const initModels = require('../models/init-models');
const models = initModels(sequelize);

// pt 요청
router.post('/ptrequest', async (req, res) => {
  if (req.session.loggedin) {
    try {
      const currentDate = new Date();
      const trainerId = req.body.trainer_id;
      const userId = req.body.id;

      const existingRequest = await pt_requests.findOne({
        where: { trainer_id: trainerId, user_id: userId },
      });

      if (existingRequest !== null) {
        return res
          .status(401)
          .json({ data: null, message: '이미 신청한 trainer입니다' });
      }

      const userpoint = await user_points.findOne({
        where: { id: userId },
      });

      const userInfo = await users.findOne({
        where: { id: userId },
      });

      const trainerInfo = await trainers.findOne({
        where: { id: trainerId },
      });

      if (userpoint.amount < req.body.totalPrice) {
        return res
          .status(401)
          .json({ data: null, message: '포인트가 부족합니다.' });
      }

      await sequelize.transaction(async transaction => {
        if (req.body.height == '' || req.body.weight == '') {
          res
            .status(400)
            .json({ data: null, message: '키와 몸무게를 입력해주세요.' });
        } else {
          await pt_requests.create(
            {
              user_id: userId,
              trainer_id: trainerId,
              date: req.body.startDate,
              count: req.body.count,
              price: req.body.price,
              request: req.body.request,
              days: req.body.days,
              gender: userInfo.gender,
              age: userInfo.age,
              height: req.body.height,
              weight: req.body.weight,
              injury: req.body.injury,
              career: req.body.career,
              significant: req.body.significant,
              bodyshape: req.body.bodyshape,
              purpose: req.body.purpose,
              lifestyle: req.body.lifestyle,
              accept: false,
            },
            { transaction },
          );

          await user_points.update(
            { amount: sequelize.literal(`amount - ${req.body.totalPrice}`) },
            { where: { user_id: userId }, transaction },
          );

          const requestCount = await dailyrequestcounts.findOne({
            where: { date: currentDate },
            transaction,
          });
          if (requestCount) {
            await dailyrequestcounts.update(
              { count: requestCount.count + 1 },
              { where: { date: currentDate }, transaction },
            );
          } else {
            await dailyrequestcounts.create(
              {
                date: currentDate,
                count: 1,
              },
              { transaction },
            );
          }

          await transaction.commit();
          res
            .status(200)
            .json({ data: null, message: '성공적으로 신청되었습니다.' });
        }
      });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ data: null, message: '서버 오류가 발생했습니다.' });
    }
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// price per one pt
router.get('/price/:id', (req, res) => {
  if (req.session.loggedin) {
    const { id } = req.params;
    trainers
      .findOne({
        where: { trainer_id: id },
        attributes: ['pt_point'],
      })
      .then(trainerInfo => {
        if (trainerInfo != undefined) {
          res.status(200).json({ data: trainerInfo, message: '' });
        } else {
          res.status(401).json({ data: null, message: '' });
        }
      });
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// user pt 요청 조회
router.get('/checklist/:id', (req, res) => {
  if (req.session.loggedin) {
    const { id } = req.params;
    pt_requests
      .findAll({
        where: { user_id: id },
      })
      .then(requestInfo => {
        if (requestInfo != undefined) {
          res.status(200).json({ data: requestInfo, message: '' });
        } else {
          res.status(401).json({ data: null, message: '' });
        }
      });
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// pt 요청 삭제
router.post('/delete/:user_id/:id', (req, res) => {
  const { user_id, id } = req.params;
  pt_requests
    .findOne({
      where: { user_id: user_id },
    })
    .then(requestInfo => {
      if (requestInfo != undefined) {
        pt_requests.destroy({
          where: { user_id: user_id, id: id },
        });
        res
          .status(200)
          .json({ data: null, message: '성공적으로 삭제되었습니다.' });
      } else {
        res.status(401).json({ data: null, message: '' });
      }
    });
});

// trainer pt 요청 조회
router.get('/checklists/:id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      const { id } = req.params;
      const ptList = await models.pt_requests.findAll({
        where: { trainer_id: id, accept: false },
        include: [
          {
            model: users,
            as: 'user',
            attributes: ['name'],
          },
        ],
      });
      const ptListWithNames = ptList.map(item => {
        const { name } = item.user;
        return { ...item.toJSON(), name };
      });
      res.status(200).json({ data: ptListWithNames, message: '' });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// trainer pt 요청 user 조회
router.get('/checklists/:id/:user_id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      const { id, user_id } = req.params;
      const bodyInfo = await bodycheck.findOne({
        where: { user_id: user_id, last: true },
      });
      const requestInfo = await models.pt_requests.findOne({
        where: { trainer_id: id, user_id: user_id },
        include: {
          model: users,
          as: 'user',
          attributes: ['name'],
          where: { id: sequelize.col('pt_requests.user_id') },
        },
      });
      const requestInfoWithNames = {
        ...requestInfo.toJSON(),
        name: requestInfo.user.name,
      };
      res.status(200).json({ data: [requestInfo, bodyInfo], message: '' });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// pt 요청 수락
router.post('/accept/:trainer_id/:id', (req, res) => {
  const { trainer_id, id } = req.params;
  pt_requests
    .findOne({
      where: { trainer_id, id },
    })
    .then(requestInfo => {
      if (requestInfo != undefined) {
        const { price } = requestInfo; // 추가된 부분

        pt_requests
          .update(
            {
              response: req.body.response,
              accept: true,
            },
            {
              where: { trainer_id, id },
            },
          )
          .then(() => {
            const {
              gender,
              age,
              height,
              weight,
              injury,
              career,
              significant,
              bodyshape,
              purpose,
              lifestyle,
            } = requestInfo;

            const memoData = {
              gender,
              age,
              height,
              weight,
              injury,
              career,
              significant,
              bodyshape,
              purpose,
              lifestyle,
            };

            const memo = Object.values(memoData).join(', ');

            const trainerManage = {
              user_id: requestInfo.user_id,
              trainer_id: requestInfo.trainer_id,
              total_pt_count: requestInfo.count,
              remain_pt_count: requestInfo.count,
              manage_memo: memo,
            };

            trainer_manage
              .create(trainerManage)
              .then(() => {
                trainer_points
                  .findOne({ where: { trainer_id } })
                  .then(pointsInfo => {
                    if (pointsInfo != undefined) {
                      const currentAmount = pointsInfo.amount;
                      const newAmount = currentAmount + price;

                      trainer_points
                        .update(
                          { amount: newAmount },
                          { where: { trainer_id } },
                        )
                        .then(() => {
                          res.status(200).json({
                            data: null,
                            message: '성공적으로 수락되었습니다.',
                          });
                        })
                        .catch(error => {
                          res.status(500).json({
                            data: null,
                            message: 'trainer_points update 오류',
                          });
                        });
                    } else {
                      res.status(404).json({
                        data: null,
                        message: 'trainer_points가 존재하지 않습니다.',
                      });
                    }
                  })
                  .catch(error => {
                    res.status(500).json({
                      data: null,
                      message: 'trainer_points findOne 오류',
                    });
                  });
              })
              .catch(error => {
                res
                  .status(500)
                  .json({ data: null, message: 'trainerManage insert 오류' });
              });
          })
          .catch(error => {
            res.status(500).json({ data: null, message: error.message });
          });
      } else {
        res
          .status(401)
          .json({ data: null, message: 'pt request가 존재하지 않습니다.' });
      }
    })
    .catch(error => {
      res.status(500).json({ data: null, message: error.message });
    });
});

// pt 요청 거절
router.post('/reject/:trainer_id/:id', (req, res) => {
  const { trainer_id, id } = req.params;
  pt_requests
    .findOne({
      where: { trainer_id: trainer_id, id: id },
    })
    .then(requestInfo => {
      if (requestInfo != undefined) {
        pt_requests
          .update(
            {
              response: req.body.response,
              accept: false,
            },
            {
              where: { trainer_id: trainer_id, id: id },
            },
          )
          .then(() => {
            res
              .status(200)
              .json({ data: null, message: '성공적으로 거절되었습니다.' });
          })
          .catch(error => {
            res.status(500).json({ data: null, message: error.message });
          });
      } else {
        res
          .status(401)
          .json({ data: null, message: 'pt request가 존재하지 않습니다.' });
      }
    })
    .catch(error => {
      res.status(500).json({ data: null, message: error.message });
    });
});

module.exports = router;
