var express = require('express');
var router = express.Router();
const { sequelize } = require('../models');
const {
  trainers,
  trainer_points,
  pt_requests,
  certifications,
  trainer_cert,
  trainer_sign_request,
  certification_auth_request,
  dailytrainercounts,
} = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
const multer = require('multer');
const AWS = require('aws-sdk');
const initModels = require('../models/init-models');
const models = initModels(sequelize);

const imageUpload = require('../modules/s3upload').upload;
const s3 = require('../modules/s3upload').s3;

//AWS s3 관련
dotenv.config();

// trainer signup
router.post(
  '/signup',
  imageUpload.single('certificationFile'),
  async function (req, res) {
    if (
      req.body.email &&
      req.body.name &&
      req.body.password &&
      req.body.age &&
      req.body.gender &&
      req.body.phonenumber
    ) {
      let transaction;
      try {
        const currentDate = new Date();
        transaction = await sequelize.transaction();

        const trainer_request = await trainer_sign_request.findOne({
          where: { email: req.body.email },
          attributes: ['email'],
          transaction,
        });
        if (trainer_request != undefined)
          res.status(409).json({
            data: trainer_request,
            message: '이미 신청된 이메일입니다.',
          });

        const trainerInfo = await trainers.findOne({
          where: { email: req.body.email },
          attributes: ['email'],
          transaction,
        });
        if (trainerInfo != undefined)
          res.status(409).json({
            data: trainerInfo,
            message: '이미 존재하는 이메일입니다.',
          });
        else {
          const hashedPassword = await bcrypt.hash(
            req.body.password,
            saltRounds,
          );
          const trainer = await trainer_sign_request.create({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
            age: req.body.age,
            gender: req.body.gender,
            phonenumber: req.body.phonenumber,
            introduction: req.body.introduction,
            pt_point: req.body.pt_point,
          });

          const uploadParams = {
            acl: 'public-read',
            ContentType: 'image/png',
            Bucket: 'fitme-s3',
            Body: req.file.buffer,
            Key: `certifications/` + trainer.id,
          };

          const result = await s3.upload(uploadParams).promise();

          const certification = await certification_auth_request.create(
            {
              trainer_request_id: trainer.id,
              trainer_id: 0,
              name: req.file.originalname,
              image_url: result.Location,
              certification_s3_key: result.Key,
            },
            { transaction },
          );

          const trainerPoint = await trainer_points.create(
            {
              trainer_id: trainer.id,
              amount: 0,
            },
            { transaction },
          );

          const trainerCount = await dailytrainercounts.findOne({
            where: { date: currentDate },
            transaction,
          });
          if (trainerCount) {
            await dailytrainercounts.update(
              { count: trainerCount.count + 1 },
              { where: { date: currentDate }, transaction },
            );
          } else {
            await dailytrainercounts.create(
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
            .json({ data: null, message: '회원가입 신청이 완료되었습니다.' });
        }
      } catch (err) {
        if (transaction) {
          await transaction.rollback();
        }
      }
    } else {
      res.status(400).json({ data: null, message: '모든 정보를 입력하세요' });
    }
  },
);

// trainer login
router.post('/login', async function (req, res) {
  if (req.body.email && req.body.password) {
    try {
      const trainerInfo = await trainers.findOne({
        where: { email: req.body.email },
      });

      if (trainerInfo != undefined) {
        const isPasswordValid = await bcrypt.compare(
          req.body.password,
          trainerInfo.password,
        );
        if (isPasswordValid) {
          req.session.save(function () {
            req.session.loggedin = true;
            res.json({
              data: trainerInfo,
              message: '로그인에 성공하였습니다',
            });
          });
        } else {
          res
            .status(401)
            .json({ data: null, message: '비밀번호가 일치하지 않습니다' });
        }
      } else {
        res.status(401).json({
          data: null,
          message: '로그인 정보가 일치하지 않습니다',
        });
      }
    } catch (err) {}
  } else {
    res.status(400).json({
      data: null,
      message: '이메일과 비밀번호를 입력하세요',
    });
  }
});

// trainers logout
router.get('/logout', function (req, res) {
  req.session.loggedin = false;
  res.status(200).json({
    data: null,
    message: '성공적으로 로그아웃되었습니다',
  });
});

// trainer delete
router.post('/withdraw/:id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      const trainerInfo = await trainers.findOne({
        where: { id: req.params.id },
      });
      if (trainerInfo != undefined) {
        if (req.body.password == trainerInfo.password) {
          await trainers.destroy({
            where: { id: req.params.id },
          });
          res.status(200).json({
            data: null,
            message: '성공적으로 탈퇴되었습니다',
          });
        } else {
          res.status(401).json({
            data: null,
            message: '비밀번호가 일치하지 않습니다.',
          });
        }
      }
    } catch (err) {}
  } else {
  }
});

// trainer info
router.get('/profile/:id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      const trainerInfo = await trainers.findOne({
        where: { id: req.params.id },
        attributes: [
          'id',
          'email',
          'name',
          'age',
          'gender',
          'phonenumber',
          'introduction',
          'career',
          'trainer_image_url',
        ],
      });
      res.status(200).json({ data: trainerInfo, message: '' });
    } catch (err) {}
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// trainer info change
router.post('/profile/changeProfile/:id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      let transaction = await sequelize.transaction();

      const trainerInfo = await trainers.findOne({
        where: { id: req.params.id },
      });

      const passwordMatch = await bcrypt.compare(
        req.body.currentPassword,
        trainerInfo.password,
      );

      if (!passwordMatch) {
        res.status(401).json({
          data: null,
          message: '현재 비밀번호가 일치하지 않습니다.',
        });
      } else {
        await trainers.update(
          {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            phonenumber: req.body.phonenumber,
            introduction: req.body.introduction,
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
      res
        .status(500)
        .json({ data: null, message: '서버 오류가 발생했습니다.' });
    }
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// trainer password change
router.post('/profile/changePassword/:id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      const { id } = req.params;
      const { currentPassword, newPassword, newPassword2 } = req.body;
      const trainerInfo = await trainers.findOne({ where: { id } });
      const passwordMatch = await bcrypt.compare(
        currentPassword,
        trainerInfo.password,
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

      await trainers.update(
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
      res
        .status(500)
        .json({ data: null, message: '서버 오류가 발생했습니다.' });
    }
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// trainer pt_point change
router.post('/profile/changePtPoint/:id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      await trainers.update(
        {
          pt_point: req.body.pt_point,
        },
        { where: { id: req.params.id } },
      );
      res.status(200).json({
        data: null,
        message: '성공적으로 변경되었습니다.',
      });
    } catch (err) {}
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// trainer introduction change
router.post('/profile/changeIntroduction/:id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      await trainers.update(
        {
          introduction: req.body.introduction,
        },
        { where: { id: req.params.id } },
      );
      res.status(200).json({
        data: null,
        message: '성공적으로 변경되었습니다.',
      });
    } catch (err) {}
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// trainerlist paging
router.get('/trainerlist', async function (req, res) {
  if (req.session.loggedin) {
    try {
      const trainerInfo = await trainers.findAll({
        attributes: [
          'id',
          'email',
          'name',
          'age',
          'gender',
          'introduction',
          'phonenumber',
        ],
      });
      res.status(200).json({ data: trainerInfo, message: '' });
    } catch (err) {}
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// trainer detail
router.get('/trainerlist/:id', async function (req, res) {
  try {
    const trainerInfo_detail = await models.trainers.findOne({
      where: { id: req.params.id },
      attributes: [
        'id',
        'name',
        'age',
        'gender',
        'phonenumber',
        'email',
        'introduction',
        'career',
        'trainer_image_url',
      ],
      include: {
        model: models.certifications,
        as: 'certifications',
        include: {
          model: models.trainer_cert,
          as: 'trainer_certs',
          attributes: ['expiration_date', 'issued_date'],
        },
        attributes: ['name'],
      },
    });
    res.status(200).json({
      data: { trainerInfo_detail },
      message: '',
    });
  } catch (err) {}
});

// trainer search
router.get('/trainerlist/:name', async function (req, res) {
  if (req.session.loggedin) {
    try {
      const trainerInfo = await trainers.findAll({
        where: { name: req.params.name },
      });
      if (trainerInfo != undefined) {
        res.status(200).json({ data: trainerInfo, message: '' });
      } else {
        res.status(200).json({
          data: null,
          message: '검색결과가 없습니다',
        });
      }
    } catch (err) {}
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// trainer revenue
router.get('/revenue/:id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      const trainer_point_amount = await trainer_points.findOne({
        where: { trainer_id: req.params.id },
      });
      res.status(200).json({ data: trainer_point_amount, message: '' });
    } catch (err) {}
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// check pt request list
router.get('/checkptrequest/:id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      const check_pt_list = await pt_requests.findAll({
        where: { trainer_id: req.params.id },
      });
      res.status(200).json({ data: check_pt_list, message: '' });
    } catch (err) {}
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// add Certificate to aws s3 and certificate table
router.post(
  '/addCertificate/:id',
  imageUpload.single('image'),
  async function (req, res) {
    if (req.session.loggedin) {
      try {
        const { id } = req.params;
        const uploadParams = {
          acl: 'public-read',
          ContentType: 'image/png',
          Bucket: 'fitme-s3',
          Body: req.file.buffer,
          Key: `certifications/` + `/${id}/`,
        };
        const result = await s3.upload(uploadParams).promise();
        const certification = await certification_auth_request.create({
          trainer_id: id,
          name: req.file.originalname,
          image_url: result.Location,
          certification_s3_key: result.Key,
        });
        res.status(200).json({
          data: null,
          message: '성공적으로 자격증을 추가하였습니다.',
        });
      } catch (err) {}
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
        const trainerInfo = await trainers.findOne({
          where: { id: req.params.id },
        });
        const s3key = trainerInfo.s3_key;
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
          Key: `trainer_profile/` + trainerInfo.id + '.',
        };
        const result = await s3.upload(uploadParams).promise();

        await trainers.update(
          {
            trainer_image_url: result.Location,
            s3_key: result.Key,
          },
          { where: { id: req.params.id } },
        );
        res.status(200).json({
          data: null,
          message: '성공적으로 프로필 사진을 변경하였습니다.',
        });
      } catch (err) {}
    } else {
      res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
    }
  },
);

// get profile image
router.get('/profileImg/:id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      const trainerInfo = await trainers.findOne({
        where: { id: req.params.id },
      });
      const profileImg = trainerInfo.trainer_image_url;
      res.status(200).json({ data: profileImg, message: '' });
    } catch (err) {
      res
        .status(500)
        .json({ data: null, message: '서버 오류가 발생했습니다.' });
    }
  }
});

// get trainer certification list
router.get('/getListOfCertification/:id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      const certificationList = await certifications.findAll({
        where: { trainer_id: req.params.id },
      });

      res.status(200).json({ data: certificationList, message: '' });
    } catch (err) {
      res.status(500).json({ data: null, message: '서버에러' });
    }
  } else res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
});

// trainer certification delete
router.post('/deleteCertification/:id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      const { id } = req.params;
      const certification = await certifications.findOne({
        where: { id: id },
      });
      const s3key = certification.certification_s3_key;
      const deleteParams = {
        Bucket: 'fitme-s3',
        Key: s3key,
      };
      await s3.deleteObject(deleteParams).promise();
      await trainer_cert.destroy({ where: { certification_id: id } });
      await certifications.destroy({ where: { id: id } });
      res.status(200).json({
        data: null,
        message: '성공적으로 자격증을 삭제하였습니다.',
      });
    } catch (err) {
      res.status(500).json({ data: null, message: '서버에러' });
    }
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// trainer 회당 가격 가져오기
router.get('/getPrice/:Id', async function (req, res) {
  try {
    const Id = req.body;
    const price = await trainers.findOne({
      where: { id: req.params.Id },
      attributes: ['pt_point'],
    });
    res.status(200).json({ data: price, message: '' });
  } catch (err) {}
});

module.exports = router;
