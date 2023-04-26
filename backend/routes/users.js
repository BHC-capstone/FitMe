var express = require('express');
var router = express.Router();
const { users } = require('../models');

// uesr signup
router.post('/signup', async function (req, res) {
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

    if (userInfo != undefined) res.send('이미 존재하는 아이디 입니다.');
    else {
      console.log(req.body);
      const result = await users.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
      });
      res.send('회원가입을 환영합니다!');
    }
  } else {
    res.send('모든 정보를 입력하세요');
    res.end();
  }
});

// user login
router.post('/login', async function (req, res) {
  if (req.body.username && req.body.password) {
    const userInfo = await users.findOne({
      where: { username: req.body.username, password: req.body.password },
    });
    if (userInfo != undefined) {
      req.session.loggedin = true;
      req.session.username = req.body.username;
      res.redirect('/');
      res.end();
    } else {
      res.send('로그인 정보가 일치하지 않습니다.');
    }
  } else {
    res.send('아이디와 비밀번호를 입력하세요!');
    res.end();
  }
});

// user logout
router.get('/logout', function (req, res) {
  req.session.loggedin = false;
  res.send('성공적으로 로그아웃되었습니다');
  res.end();
});

// user delete
router.post('/withdraw', async function (req, res) {
  if (req.body.username && req.body.password) {
    const userInfo = await users.findOne({
      where: { username: req.body.username, password: req.body.password },
    });
    if (userInfo != undefined) {
      await users.destroy({
        where: { username: req.body.username, password: req.body.password },
      });
      res.send('성공적으로 탈퇴되었습니다.');
      res.end();
    } else {
      res.send('아이디와 비밀번호를 확인하세요!');
      res.end();
    }
  } else {
    res.send('아이디와 비밀번호를 입력하세요!');
    res.end();
  }
});

// user info
router.get('/profile/:userid', async function (req, res) {
  const userInfo = await users.findOne({
    where: { username: req.params.userid },
  });
  res.send(userInfo);
  res.end();
});


// user info update
router.post('/profile/changeProfile/:userid', async function (req, res) {
  if (req.session.loggedin) {
    const userInfo = await users.findOne({
      where: { username: req.params.userid },
    });
    if (req.body.password != req.body.password2)
    res.send('입력된 비밀번호가 서로 다릅니다.');
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
    res.send('성공적으로 변경되었습니다.');
    res.end();
  }
  } else { 
    res.send('로그인이 필요합니다.');
    res.end();
  }
});



// user point info
router.get('/point', async function (req, res) {
  if (req.session.loggedin) {
    const userInfo = await users.findOne({
      where: { username: req.session.username },
    });
    res.send(userInfo.point);
    res.end();
  } else {
    res.send('로그인이 필요합니다.');
    res.end();
  }
});



module.exports = router;
