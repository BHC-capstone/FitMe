var express = require("express");
var router = express.Router();
const { users } = require("../models");

// uesr signup
<<<<<<< HEAD
router.post('/signup', async function (req, res) {
  if (
    (req.body.email,
    req.body.userid,
    req.body.username,
    req.body.password,
    req.body.age,
    req.body.gender,
    req.body.phnumber)
  ) {
    try {
      const userInfo = await users.findOne({
        where: { userid: req.body.userid, password: req.body.password },
      });
  
      if (userInfo != undefined) res.status(409).json({ data: result, message: '이미 존재하는 아이디입니다' });
      else {
        console.log(req.body);
        const result = await users.create({
          email: req.body.email,
          userid: req.body.userid,
          username: req.body.username,
          password: req.body.password,
          age: req.body.age,
          gender: req.body.gender,
          phnumber: req.body.phnumber,
        });
        res.status(200).json({ data: null, message: '회원가입을 환영합니다' });
      }
    }
    catch(err){
      console.log(err);
    }

  } else {
    res.status(400).json({ data: null, message: '모든 정보를 입력하세요' });
  }
});

// user login
router.post('/login', async function (req, res) {
  if (req.body.userid && req.body.password) {
    try{
    const userInfo = await users.findOne({
      where: { userid: req.body.userid, password: req.body.password },
    });
    if (userInfo != undefined) {
      req.session.loggedin = true;
      req.session.userid = req.body.userid;
      res.redirect('/');
      res.end();
=======
router.post("/signup", async function (req, res) {
    if (
        (req.body.username,
        req.body.password,
        req.body.email,
        req.body.age,
        req.body.gender)
    ) {
        const userInfo = await users.findOne({
            where: { username: req.body.username, password: req.body.password },
        });

        if (userInfo != undefined)
            res.status(409).json({
                data: result,
                message: "이미 존재하는 아이디입니다",
            });
        else {
            try {
                const result = await users.create({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    age: req.body.age,
                    gender: req.body.gender,
                });
                res.status(200).json({
                    data: null,
                    message: "회원가입을 환영합니다",
                });
            } catch (err) {
                console.log(err);
            }
        }
    } else {
        res.status(400).json({ data: null, message: "모든 정보를 입력하세요" });
    }
});

// user login
router.post("/login", async function (req, res) {
    if (req.body.username && req.body.password) {
        const userInfo = await users.findOne({
            where: { username: req.body.username, password: req.body.password },
        });
        if (userInfo != undefined) {
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

// user logout
router.get("/logout", function (req, res) {
    req.session.loggedin = false;
    res.status(200).json({
        data: null,
        message: "성공적으로 로그아웃되었습니다",
    });
});

// user delete
<<<<<<< HEAD
router.post('/withdraw', async function (req, res) {
  if (req.body.userid && req.body.password) {
    try{
    const userInfo = await users.findOne({
      where: { userid: req.body.userid, password: req.body.password },
    });
    if (userInfo != undefined) {
      await users.destroy({
        where: { userid: req.body.userid, password: req.body.password },
      });
      res.status(200).json({ data: null, message: '성공적으로 탈퇴되었습니다' });
    } else {
      res.status(401).json({ data: null, message: '아이디와 비밀번호를 확인하세요' });
      }
    }
    catch(err){
      console.log(err);
=======
router.post("/withdraw", async function (req, res) {
    if (req.body.username && req.body.password) {
        const userInfo = await users.findOne({
            where: { username: req.body.username, password: req.body.password },
        });
        if (userInfo != undefined) {
            await users.destroy({
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
    } else {
        res.status(400).json({
            data: null,
            message: "아이디와 비밀번호를 입력하세요",
        });
>>>>>>> main
    }
});

// user info
<<<<<<< HEAD
router.get('/profile/:userid', async function (req, res) {
  try{
  const userInfo = await users.findOne({
    where: { userid: req.params.userid },
  });
  res.status(200).json({ data: userInfo, message: '' });
  }
  catch(err){
    console.log(err);
  }
});


// user info update
router.post('/profile/changeProfile/:userid', async function (req, res) {
  if (req.session.loggedin) {
    try{
    const userInfo = await users.findOne({
      where: { userid: req.params.userid },
    });
    if (req.body.password != req.body.password2)
    res.status(401).json({ data: null, message: '입력된 비밀번호가 서로 다릅니다.' });
  else {
    try{
    await users.update(
      {
        email: req.body.email,
        userid: req.body.userid,
        username: req.body.username,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        phnumber: req.body.phnumber,
      },
      { where: { userid: req.params.userid } }
    );
    res.status(200).json({ data: null, message: '성공적으로 변경되었습니다.' });
    }
    catch(err){
      console.log(err);
    }
  }}
  catch(err){
    console.log(err);
  }
  } else { 
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
=======
router.get("/profile/:userid", async function (req, res) {
    const userInfo = await users.findOne({
        where: { username: req.params.userid },
    });
    res.status(200).json({ data: userInfo, message: "" });
>>>>>>> main
});

// user info update
router.post("/profile/changeProfile/:userid", async function (req, res) {
    if (req.session.loggedin) {
        const userInfo = await users.findOne({
            where: { username: req.params.userid },
        });
        if (req.body.password != req.body.password2)
            res.status(401).json({
                data: null,
                message: "입력된 비밀번호가 서로 다릅니다.",
            });
        else {
            await users.update(
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
});

// user point info
<<<<<<< HEAD
router.get('/userpoint', async function (req, res) {
  if (req.session.loggedin) {
    try{
    const userInfo = await users.findOne({
      where: { userid: req.session.userid },
    });
    res.status(200).json({ data: userInfo.point, message: '' });
  }
  catch(err){
    console.log(err);
  }}
   else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
=======
router.get("/point", async function (req, res) {
    if (req.session.loggedin) {
        const userInfo = await users.findOne({
            where: { username: req.session.username },
        });
        res.status(200).json({ data: userInfo.point, message: "" });
    } else {
        res.status(401).json({ data: null, message: "로그인이 필요합니다." });
    }
>>>>>>> main
});

module.exports = router;
