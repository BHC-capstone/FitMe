var express = require("express");
var router = express.Router();
const { trainers, trainer_points, pt_requests } = require('../models');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const multerS3 = require('multer-s3');
const dotenv = require('dotenv');
const multer = require('multer');
const AWS = require('aws-sdk');

//AWS s3 관련
dotenv.config();
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: "ap-northeast-2",
});

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "fitme-s3",
        acl: "public-read",
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            cb(null, `${Date.now()}_${file.originalname}`);
        },
    }),
});

// trainer signup
router.post(
    "/signup",
    upload.single("certificationFile"),
    async function (req, res) {
        console.log(req.body);
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
                  transaction = await sequelize.transaction();

                  const trainerInfo = await trainers.findOne({
                    where: { email: req.body.email },
                    attributes: ['email'],
                    transaction,
                  });
                  if (trainerInfo != undefined) 
                    res.status(409).json({ data: result, message: '이미 존재하는 아이디입니다.' });
                    else {
                    console.log(req.body);
                    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
                    const trainer = await trainers.create({
                        name: req.body.name,
                        password: hashedPassword,
                        email: req.body.email,
                        age: req.body.age,
                        gender: req.body.gender,
                        phonenumber: req.body.phonenumber,
                        introduction: req.body.introduction,
                    });

                    const trainerPoint = await trainer_points.create({
                        trainer_id: trainer.id,
                        amount: 0
                    }, { transaction });

                    await transaction.commit();
                    res.status(200).json({ data: null, message: '회원가입을 환영합니다.' });
                  }
                } catch (err) {
                    console.log(err);
                if (transaction) {
                  await transaction.rollback();
                }
            }
        } else {
            res.status(400).json({data: null, message: "모든 정보를 입력하세요"});
        }
});


// trainer login
router.post("/login", async function (req, res) {
    if (req.body.email && req.body.password) {
        try {
            const trainerInfo = await trainers.findOne({
                where: { email: req.body.email},
            });

            if (trainerInfo != undefined) {
              const isPasswordValid = await bcrypt.compare(req.body.password, trainerInfo.password);
                if (isPasswordValid) {
                  res.status(200).json({data: trainerInfo, message: "로그인 성공"});
                }
                else {
                  res.status(401).json({data: null, message: "비밀번호가 일치하지 않습니다"});
                }
            } else {
                res.status(401).json({
                    data: null,
                    message: "로그인 정보가 일치하지 않습니다",
                });
            }
        } catch (err) {
            console.log(err);
        }
    } else {
        res.status(400).json({
            data: null,
            message: "아이디와 비밀번호를 입력하세요",
        });
    }
});

// trainers logout
router.get("/logout", function (req, res) {
    req.session.loggedin = false;
    res.status(200).json({
        data: null,
        message: "성공적으로 로그아웃되었습니다",
    });
});

// trainer delete
router.post("/withdraw/:id", async function (req, res) {
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
                    message: "성공적으로 탈퇴되었습니다",
                });
            } else {
                res.status(401).json({
                    data: null,
                    message: "비밀번호가 일치하지 않습니다.",
                });
            }
        }
    } catch (err) {
        console.log(err);
    }
});

// trainer info
router.get("/profile/:id", async function (req, res) {
    try {
        const trainerInfo = await trainers.findOne({
            where: { id: req.params.id },
            attributes: [
                "id",
                "email",
                "name",
                "age",
                "gender",
                "phonenumber",
                "introduction",
                "career",
                "review_avg",
            ],
        });
        res.status(200).json({ data: trainerInfo, message: "" });
    } catch (err) {
        console.log(err);
    }
});

// trainer info change
router.post("/profile/changeProfile/:id", async function (req, res) {
    try {
        const trinersInfo = await trainers.findOne({
            where: { id: req.params.id },
        });
        if (req.body.password != req.body.password2)
            res.status(401).json({
                data: null,
                message: "입력된 비밀번호가 서로 다릅니다.",
            });
        else {
            await trainers.update(
                {
                    email: req.body.email,
                    name: req.body.name,
                    password: req.body.password,
                    age: req.body.age,
                    gender: req.body.gender,
                    phonenumber: req.body.phonenumber,
                    introduction: req.body.introduction,
                },
                { where: { id: req.params.id } }
            );
            res.status(200).json({
                data: null,
                message: "성공적으로 변경되었습니다.",
            });
        }
    } catch (err) {
        console.log(err);
    }
});

// trainerlist paging
router.get("/trainerlist", async function (req, res) {
    try {
        const trainerInfo = await trainers.findAll({
            attributes: [
                "id",
                "email",
                "name",
                "age",
                "gender",
                "introduction",
                "phonenumber",
                "review_avg",
            ],
        });
        res.status(200).json({ data: trainerInfo, message: "" });
    } catch (err) {
        console.log(err);
    }
});

// trainer detail
router.get("/trainerlist/:id", async function (req, res) {
    try {
        const trainerInfo_detail = await trainers.findOne({
            where: { id: req.params.id },
            attributes: [
                "id",
                "name",
                "age",
                "gender",
                "phonenumber",
                "email",
                "introduction",
                "career",
                "review_avg",
            ],
        });
        const trainer_reviews = await trainer_review.findAll({
            where: { trainer_id: req.params.id },
        });
        res.status(200).json({
            data: { trainerInfo_detail, trainer_reviews },
            message: "",
        });
    } catch (err) {
        console.log(err);
    }
});

// trainer search
router.get("/trainerlist/:name", async function (req, res) {
    try {
        const trainerInfo = await trainers.findAll({
            where: { name: req.params.name },
        });
        if (trainerInfo != undefined) {
            res.status(200).json({ data: trainerInfo, message: "" });
        } else {
            res.status(200).json({
                data: null,
                message: "검색결과가 없습니다",
            });
        }
    } catch (err) {
        console.log(err);
    }
});

// trainer revenue
router.get("/revenue/:id", async function (req, res) {
    if (req.session.loggedin) {
        try {
            const trainer_point_amount = await trainer_points.findOne({
                where: { trainer_id: req.params.id },
            });
            res.status(200).json({ data: trainer_point_amount, message: "" });
        } catch (err) {
            console.log(err);
        }
    } else {
        res.status(401).json({ data: null, message: "로그인이 필요합니다." });
    }
});

// check pt request list
router.get('/checkptrequest/:id', async function (req, res) {
//  if (req.session.loggedin) {
    try{
    const check_pt_list = await pt_requests.findAll({
      where: { trainer_id: req.params.id },
    });
    res.status(200).json({ data: check_pt_list, message: '' });
    }
    catch(err){
      console.log(err);
    }
//  } else {
//    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
//  }
});

// check pt request detail
router.get('/checkptrequest/detail/:id/:user_id)', async function (req, res) {
//    if (req.session.loggedin) {
        try{
        const check_pt_detail = await trainer_manage.findAll({
          where: { trainer_id: req.params.id, user_id: req.params.user_id },
        });
        res.status(200).json({ data: check_pt_detail, message: '' });
        }
        catch(err){
            console.log(err);
        }
//    else {
//        res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
//    }
});

module.exports = router;
