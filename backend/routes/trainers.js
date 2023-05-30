var express = require('express');
var router = express.Router();
const { sequelize } = require('../models');
const {
  trainers,
  trainer_points,
  pt_requests,
  certifications,
  trainer_cert,
  trainer_review,
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
    console.log(req.body);
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
        transaction = await sequelize.transaction();

        const trainerInfo = await trainers.findOne({
          where: { email: req.body.email },
          attributes: ['email'],
          transaction,
        });
        if (trainerInfo != undefined)
          res.status(409).json({
            data: trainerInfo,
            message: '이미 존재하는 아이디입니다.',
          });
        else {
          console.log(req.body);
          const hashedPassword = await bcrypt.hash(
            req.body.password,
            saltRounds
          );
          const trainer = await trainers.create({
            name: req.body.name,
            password: hashedPassword,
            email: req.body.email,
            age: req.body.age,
            gender: req.body.gender,
            phonenumber: req.body.phonenumber,
            introduction: req.body.introduction,
          });

          const uploadParams = {
            acl: 'public-read',
            ContentType: 'image/png',
            Bucket: 'fitme-s3',
            Body: req.file.buffer,
            Key: `certifications/` + trainer.id + '.' + req.file.originalname,
          };

          const result = await s3.upload(uploadParams).promise();

          const certification = await certifications.create(
            {
              trainer_id: trainer.id,
              name: req.file.originalname,
              image_url: result.Location,
            },
            { transaction }
          );

          const trainerPoint = await trainer_points.create(
            {
              trainer_id: trainer.id,
              amount: 0,
            },
            { transaction }
          );

          const trainer_certs = await trainer_cert.create(
            {
              trainer_id: trainer.id,
              certification_id: certification.id,
            },
            { transaction }
          );

          await transaction.commit();
          res
            .status(200)
            .json({ data: null, message: '회원가입을 환영합니다.' });
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
  }
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
          trainerInfo.password
        );
        if (isPasswordValid) {
          req.session.save(function () {
            req.session.loggedin = true;
            res.json({ data: trainerInfo, message: '로그인에 성공하였습니다' });
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
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(400).json({
      data: null,
      message: '아이디와 비밀번호를 입력하세요',
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
    } catch (err) {
      console.log(err);
    }
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
          'review_avg',
        ],
      });
      res.status(200).json({ data: trainerInfo, message: '' });
    } catch (err) {
      console.log(err);
    }
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// trainer info change
router.post('/profile/changeProfile/:id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      let transaction = await sequelize.transaction();

      const trinersInfo = await trainers.findOne(
        {
          where: { id: req.params.id },
        },
        { transaction }
      );
      if (req.body.password != req.body.password2)
        res.status(401).json({
          data: null,
          message: '입력된 비밀번호가 서로 다릅니다.',
        });
      else {
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        await trainers.update(
          {
            email: req.body.email,
            name: req.body.name,
            password: hashedPassword,
            age: req.body.age,
            gender: req.body.gender,
            phonenumber: req.body.phonenumber,
            introduction: req.body.introduction,
          },
          { where: { id: req.params.id } },
          { transaction }
        );
        res.status(200).json({
          data: null,
          message: '성공적으로 변경되었습니다.',
        });
      }
    } catch (err) {
      console.log(err);
    }
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
          'review_avg',
        ],
      });
      res.status(200).json({ data: trainerInfo, message: '' });
    } catch (err) {
      console.log(err);
    }
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
        'review_avg',
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
    console.log(trainerInfo_detail);
    const trainer_reviews = await trainer_review.findAll({
      where: { trainer_id: req.params.id },
    });
    res.status(200).json({
      data: { trainerInfo_detail, trainer_reviews },
      message: '',
    });
  } catch (err) {
    console.log(err);
  }
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
    } catch (err) {
      console.log(err);
    }
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
    } catch (err) {
      console.log(err);
    }
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
    } catch (err) {
      console.log(err);
    }
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
          Key: `certifications/` +
          `/${req.params.id}/` +
          req.file.originalname,
        };
        const result = await s3.upload(uploadParams).promise();
        const certification = await certifications.create(
          {
            trainer_id: id,
            name: req.file.originalname,
            image_url: result.Location,
          }
        );
        const trainer_certs = await trainer_cert.create(
          {
            trainer_id: id,
            certification_id: certification.id,
          }
        );
        res.status(200).json({
          data: null,
          message: '성공적으로 자격증을 추가하였습니다.',
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
    }
  }
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
        if(s3key != null){
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
          Key:
            `trainer_profile/` + trainerInfo.id + '.' + req.file.originalname,
        };
        const result = await s3.upload(uploadParams).promise();

        await trainers.update(
          {
            trainer_image_url: result.Location,
          },
          { where: { id: req.params.id } }
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
  }
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
      console.log(err);
    }
  }
});

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

module.exports = router;
