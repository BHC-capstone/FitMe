var express = require("express");
var router = express.Router();
const { trainers } = require("../models");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
const multer = require("multer");
const AWS = require("aws-sdk");

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
<<<<<<< HEAD
router.post('/signup', async function (req, res) {
  if (
    (req.body.email,
     req.body.userid,
     req.body.username,
     req.body.password,
     req.body.age,
     req.body.gender,
     req.body.phnumber,
     req.body.introduction
    )
  ) {
    try{
    const trainerInfo = await trainers.findOne({
      where: { userid: req.body.userid, password: req.body.password },
    });

    if (trainerInfo != undefined) res.status(409).send('이미 존재하는 아이디입니다');
    else {
      const result = await trainers.create({
        email: req.body.email,
        userid: req.body.userid,
        username: req.body.username,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        phnumber: req.body.phnumber,
        introduction: req.body.introduction
      });
      res.status(200).json({ data: null, message: '회원가입을 환영합니다' });
    }}
    catch(err){
      console.log(err);
=======
router.post(
    "/signup",
    upload.single("certificationFile"),
    async function (req, res) {
        console.log(req.body);

        if (req.body.username && req.body.password) {
            const trainerInfo = await trainers.findOne({
                where: {
                    username: req.body.username,
                    password: req.body.password,
                },
            });

            if (trainerInfo != undefined)
                res.status(409).send("이미 존재하는 아이디입니다");
            else {
                try {
                    const result = await trainers.create({
                        username: req.body.username,
                        password: req.body.password,
                        email: req.body.email,
                        age: req.body.age,
                        gender: req.body.gender,
                        introduction: req.body.introduction,
                    });
                } catch (err) {
                    console.log(err);
                }
                res.status(200).json({
                    data: null,
                    message: "회원가입을 환영합니다",
                });
            }
        } else {
            res.status(400).json({
                data: null,
                message: "모든 정보를 입력하세요",
            });
        }
>>>>>>> main
    }
);

// trainer login
<<<<<<< HEAD
router.post('/login', async function (req, res) {
  if (req.body.userid && req.body.password) {
    try{
    const trainerInfo = await trainers.findOne({
      where: { userid: req.body.userid, password: req.body.password },
    });

    if (trainerInfo != undefined) {
      req.session.loggedin = true;
      req.session.userid = req.body.userid;
      res.redirect('/');
      res.end();
=======
router.post("/login", async function (req, res) {
    if (req.body.username && req.body.password) {
        const trainerInfo = await trainers.findOne({
            where: { username: req.body.username, password: req.body.password },
        });

        if (trainerInfo != undefined) {
            req.session.loggedin = true;
            req.session.username = req.body.username;
            res.redirect("/");
            res.end();
        } else {
            res.status(401).json({
                data: null,
                message: "로그인 정보가 일치하지 않습니다",
            });
        }
>>>>>>> main
    } else {
        res.status(400).json({
            data: null,
            message: "아이디와 비밀번호를 입력하세요",
        });
    }
<<<<<<< HEAD
    }
    catch(err){
      console.log(err);
    }
  } else {
    res.status(400).json({ data: null, message: '아이디와 비밀번호를 입력하세요' });
  }
=======
>>>>>>> main
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
<<<<<<< HEAD
router.post('/withdraw', async function (req, res) {
  if (req.body.userid && req.body.password) {
    try{
    const trainerInfo = await trainers.findOne({
      where: { userid: req.body.userid, password: req.body.password },
    });
    if (trainerInfo != undefined) {
      await trainers.destroy({
        where: { userid: req.body.userid, password: req.body.password },
      });
      res.status(200).json({ data: null, message: '성공적으로 탈퇴되었습니다' });
=======
router.post("/withdraw", async function (req, res) {
    if (req.body.username && req.body.password) {
        const trainerInfo = await trainers.findOne({
            where: { username: req.body.username, password: req.body.password },
        });
        if (trainerInfo != undefined) {
            await trainers.destroy({
                where: {
                    username: req.body.username,
                    password: req.body.password,
                },
            });
            res.status(200).json({
                data: null,
                message: "성공적으로 탈퇴되었습니다",
            });
        } else {
            res.status(401).json({
                data: null,
                message: "아이디와 비밀번호를 확인하세요",
            });
        }
>>>>>>> main
    } else {
        res.status(400).json({
            data: null,
            message: "아이디와 비밀번호를 입력하세요",
        });
    }
<<<<<<< HEAD
    }
    catch(err){
      console.log(err);
    }
  } else {
    res.status(400).json({ data: null, message: '아이디와 비밀번호를 입력하세요' });
  }
});

// trainer info
router.get('/profile/:userid', async function (req, res) {
  try{
  const trainerInfo = await trainers.findOne({
    where: { userid: req.params.userid },
  });
  res.status(200).json({ data: trainerInfo, message: '' });
}
  catch(err){
    console.log(err);
  }
});

// trainer info change
router.post('/profile/changeProfile/:userid', async function (req, res) {
  if (req.session.loggedin) {
    try{
    const trinersInfo = await trainers.findOne({
      where: { userid: req.params.userid },
    });
    if (req.body.password != req.body.password2)
    res.status(401).json({ data: null, message: '입력된 비밀번호가 서로 다릅니다.' });
  else {
    await trainers.update(
      {
        email: req.body.email,
        userid: req.body.userid,
        username: req.body.username,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        phnumber: req.body.phnumber,
        introduction: req.body.introduction
      },
      { where: { userid: req.params.userid } }
    );
    res.status(200).json({ data: null, message: '성공적으로 변경되었습니다.' });
  }}
  catch(err){
    console.log(err);
  }
  } else { 
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
=======
});

// trainer info
router.get("/profile/:userid", async function (req, res) {
    const trainerInfo = await trainers.findOne({
        where: { username: req.params.userid },
    });
    res.status(200).json({ data: trainerInfo, message: "" });
});

// trainer info change
router.post("/profile/changeProfile/:userid", async function (req, res) {
    if (req.session.loggedin) {
        const trinersInfo = await trainers.findOne({
            where: { username: req.params.userid },
        });
        if (req.body.password != req.body.password2)
            res.status(401).json({
                data: null,
                message: "입력된 비밀번호가 서로 다릅니다.",
            });
        else {
            await trainers.update(
                {
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    age: req.body.age,
                    gender: req.body.gender,
                },
                { where: { username: req.params.userid } }
            );
            res.status(200).json({
                data: null,
                message: "성공적으로 변경되었습니다.",
            });
        }
    } else {
        res.status(401).json({ data: null, message: "로그인이 필요합니다." });
    }
>>>>>>> main
});

// trainerlist paging
router.get("/trainerlist", async function (req, res) {
    const trainerInfo = trainers.findAll({
        attributes: ["name", "age", "gender", "introduction"],
    });
    res.send(trainerInfo);
});

// trainer search
<<<<<<< HEAD
router.get('/trainerlist/${}', async function (req, res) {
  try{  
  const trainerInfo = await trainers.findOne({
        where: { userid: req.body.userid },
=======
router.get("/trainerlist/${}", async function (req, res) {
    const trainerInfo = await trainers.findOne({
        where: { name: req.body.name },
>>>>>>> main
    });
    if (trainerInfo != undefined) {
        res.status(200).json({ data: trainerInfo, message: "" });
    } else {
        res.status(200).json({ data: null, message: "검색결과가 없습니다" });
    }
  }
  catch(err){
    console.log(err);
  }
});

// trainer revenue
<<<<<<< HEAD
router.get('/revenue', async function (req, res) {
if (req.session.loggedin) {
  try{
  const trainerInfo = await trainers.findOne({
    where: { userid: req.session.userid },
  });
  res.status(200).json({ data: trainerInfo.point, message: '' });
  } 
  catch(err){
    console.log(err);
  }}
  else {
  res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
=======
router.get("/revenue", async function (req, res) {
    if (req.session.loggedin) {
        const trainerInfo = await trainers.findOne({
            where: { username: req.session.username },
        });
        res.status(200).json({ data: trainerInfo.point, message: "" });
    } else {
        res.status(401).json({ data: null, message: "로그인이 필요합니다." });
    }
>>>>>>> main
});

module.exports = router;
