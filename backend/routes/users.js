var express = require('express');
var router = express.Router();
const { users, user_points, feedbacks, dailyusercounts } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const { sequelize } = require('../models');
const { Model } = require('sequelize');
const initModels = require('../models/init-models');
const models = initModels(sequelize);
const imageUpload = require('../modules/s3upload').upload;
const s3 = require('../modules/s3upload').s3;

models.users.findOne;

// uesr signup
router.post('/signup', async function (req, res) {
  if (
    (req.body.email,
    req.body.name,
    req.body.password,
    req.body.age,
    req.body.gender,
    req.body.phonenumber)
  ) {
    let transaction;
    try {
      const currentDate = new Date();
      transaction = await sequelize.transaction();
      const userInfo = await users.findOne({
        where: { email: req.body.email },
        attributes: ['email'],
        transaction,
      });

      if (userInfo != undefined)
        res
          .status(409)
          .json({ data: null, message: '이미 존재하는 이메일입니다' });
      else {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        const user = await users.create({
          email: req.body.email,
          name: req.body.name,
          password: hashedPassword,
          age: req.body.age,
          gender: req.body.gender,
          phonenumber: req.body.phonenumber,
          transaction,
        });
        const userPoint = await user_points.create(
          {
            user_id: user.id,
            amount: 0,
          },
          { transaction },
        );

        const userCount = await dailyusercounts.findOne({
          where: { date: currentDate },
          transaction,
        });
        if (userCount) {
          await dailyusercounts.update(
            { count: userCount.count + 1 },
            { where: { date: currentDate }, transaction },
          );
        } else {
          await dailyusercounts.create(
            {
              date: currentDate,
              count: 1,
            },
            { transaction },
          );
        }

        await transaction.commit();
        res.status(200).json({ data: null, message: '회원가입을 환영합니다' });
      }
    } catch (err) {
      console.log(err);

      if (transaction) {
        await transaction.rollback();
      }
    }
  } else {
    res.status(400).json({ data: null, message: '모든 정보를 입력하세요' });
  }
});

// user login
router.post('/login', async function (req, res) {
  if (req.body.email && req.body.password) {
    try {
      const userInfo = await users.findOne({
        where: { email: req.body.email },
      });
      if (userInfo != undefined) {
        const isPasswordValid = await bcrypt.compare(
          req.body.password,
          userInfo.password,
        );
        if (isPasswordValid) {
          req.session.save(function () {
            req.session.loggedin = true;
            res.json({ data: userInfo, message: '로그인에 성공하였습니다' });
          });
        } else {
          res
            .status(401)
            .json({ data: null, message: '비밀번호가 일치하지 않습니다' });
        }
      } else {
        res.status(400).json({
          data: null,
          message: '이메일 혹은 비밀번호가 일치하지 않습니다',
        });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res
      .status(400)
      .json({ data: null, message: '이메일과 비밀번호를 입력하세요' });
  }
});

// user logout
router.get('/logout', function (req, res) {
  req.session.loggedin = false;
  res
    .status(200)
    .json({ data: null, message: '성공적으로 로그아웃되었습니다' });
});

// user delete
router.post('/withdraw/:id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      const userInfo = await users.findOne({
        where: { id: req.params.id },
      });
      if (userInfo != undefined) {
        await users.destroy({
          where: { id: req.params.id },
        });
        res
          .status(200)
          .json({ data: null, message: '성공적으로 탈퇴되었습니다' });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(400).json({ data: null, message: '로그인 하세요' });
  }
});

// user info
router.get('/profile/:id', async function (req, res) {
  try {
    const userInfo = await users.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'email', 'name', 'age', 'gender', 'phonenumber'],
    });
    res.status(200).json({ data: userInfo, message: '' });
  } catch (err) {
    console.log(err);
  }
});

// user info update
router.post('/profile/changeProfile/:id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      let transaction = await sequelize.transaction();
      const userInfo = await users.findOne({
        where: { id: req.params.id },
      });
      const passwordMatch = await bcrypt.compare(
        req.body.currentPassword,
        userInfo.password,
      );

      if (!passwordMatch) {
        res.status(401).json({
          data: null,
          message: '현재 비밀번호가 일치하지 않습니다.',
        });
      } else {
        await users.update(
          {
            email: req.body.email,
            name: req.body.name,
            password: userInfo.password,
            age: req.body.age,
            gender: req.body.gender,
            phonenumber: req.body.phonenumber,
          },
          { where: { id: req.params.id } },
          { transaction },
        );

        await transaction.commit();

        res.status(200).json({
          data: null,
          message: '성공적으로 변경되었습니다.',
        });
      }
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

// user password change
router.post('/profile/changePassword/:id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword, newPassword2 } = req.body;
      const userInfo = await users.findOne({
        where: { id: req.params.id },
      });
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        userInfo.password,
      );
      if (!passwordMatch) {
        return res.status(401).json({
          data: null,
          message: '현재 비밀번호가 일치하지 않습니다.',
        });
      }
      if (newPassword !== newPassword2) {
        return res.status(401).json({
          data: null,
          message: '입력된 새 비밀번호가 일치하지 않습니다.',
        });
      }
      const hashedPassword = await bcrypt.hash(newPassword, saltRounds);
      await users.update(
        {
          password: hashedPassword,
        },
        { where: { id } },
      );

      res.status(200).json({
        data: null,
        message: '성공적으로 비밀번호가 변경되었습니다.',
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

// user point info
router.get('/userpoint/:id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      const user_point_amount = await user_points.findOne({
        where: { user_id: req.params.id },
      });
      res.status(200).json({ data: user_point_amount, message: '' });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// myPage profile image upload with aws s3
router.post(
  '/profileImage/:id',
  imageUpload.single('image'),
  async function (req, res) {
    if (req.session.loggedin) {
      try {
        const userInfo = await users.findOne({
          where: { id: req.params.id },
        });

        const uploadParams = {
          acl: 'public-read',
          ContentType: 'image/png',
          Bucket: 'fitme-s3',
          Body: req.file.buffer,
          Key: `user_profile/` + userInfo.id + '.' + req.file.originalname,
        };
        const result = await s3.upload(uploadParams).promise();

        await users.update(
          {
            user_image_url: result.Location,
          },
          { where: { id: req.params.id } },
        );
        res.status(200).json({
          data: null,
          message: '성공적으로 프로필 사진을 변경하였습니다.',
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
    }
  },
);

// myPage profile image upload with aws s3
router.post(
  '/changeProfileImage/:id',
  imageUpload.single('profileImage'),
  async function (req, res) {
    if (req.session.loggedin) {
      try {
        const userInfo = await users.findOne({
          where: { id: req.params.id },
        });
        const s3key = userInfo.s3_key;
        if (s3key != null) {
          const deleteParams = {
            Bucket: 'fitme-s3',
            Key: s3key,
          };
          await s3.deleteObject(deleteParams).promise();
        }
        const uploadParams = {
          acl: 'public-read',
          ContentType: 'image/png',
          Bucket: 'fitme-s3',
          Body: req.file.buffer,
          Key: `user_profile/` + userInfo.id + '.' + req.file.originalname,
        };
        const result = await s3.upload(uploadParams).promise();

        await users.update(
          {
            user_image_url: result.Location,
          },
          { where: { id: req.params.id } },
        );
        res.status(200).json({
          data: null,
          message: '성공적으로 프로필 사진을 변경하였습니다.',
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
    }
  },
);

// get profile image
router.get('/profileImg/:id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      const userInfo = await users.findOne({
        where: { id: req.params.id },
      });
      const profileImg = userInfo.user_image_url;
      res.status(200).json({ data: profileImg, message: '' });
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ data: null, message: '서버 오류가 발생했습니다.' });
    }
  }
});

// check user bodyinfo
router.get('/checkbodyinfo/:id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      const Feedback = await feedbacks.findAll({
        where: {
          user_id: req.params.id,
        },
        attributes: ['id', 'date', 'height', 'weight', 'bmi'],
        order: [['date', 'ASC']],
      });
      res.status(200).json({ data: Feedback, message: '' });
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

module.exports = router;
