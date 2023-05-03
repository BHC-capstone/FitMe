var express = require('express');
var router = express.Router();
const { users } = require('../models');

// uesr signup
router.post('/signup', async function (req, res) {
  console.log(req.body);
  if (
    (req.body.email,
    req.body.name,
    req.body.password,
    req.body.age,
    req.body.gender,
    req.body.phonenumber)
  ) {
    try {
      const userInfo = await users.findOne({
        where: { email: req.body.email },
        attributes: ['email'],
      });

      if (userInfo != undefined)
        res
          .status(409)
          .json({ data: result, message: '이미 존재하는 아이디입니다' });
      else {
        console.log(req.body);
        const result = await users.create({
          email: req.body.email,
          name: req.body.name,
          password: req.body.password,
          age: req.body.age,
          gender: req.body.gender,
          // phonenumber: req.body.phonenumber,
        });
        res.status(200).json({ data: null, message: '회원가입을 환영합니다' });
      }
    } catch (err) {
      console.log(err);
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
        where: { email: req.body.email, password: req.body.password },
      });
      if (userInfo != undefined) {
        res.status(200).json({ data: userInfo, message: '로그인 성공' });
      } else {
        res
          .status(401)
          .json({ data: null, message: '로그인 정보가 일치하지 않습니다' });
      }
    } catch (err) {
      console.log(err);
    }
  } else {
    res
      .status(400)
      .json({ data: null, message: '아이디와 비밀번호를 입력하세요' });
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
router.post('/withdraw:id', async function (req, res) {
  if (req.session.loggedin) {
    try {
      const userInfo = await users.findOne({
        where: { id: req.body.id },
      });
      if (userInfo != undefined) {
        await users.destroy({
          where: { id: req.body.id },
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
  // if (req.session.loggedin) {
  try {
    const userInfo = await users.findOne({
      where: { id: req.params.id },
    });
    if (req.body.password != req.body.password2)
      res
        .status(401)
        .json({ data: null, message: '입력된 비밀번호가 서로 다릅니다.' });
    else {
      try {
        console.log(req.body);
        await users.update(
          {
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
            age: req.body.age,
            gender: req.body.gender,
            phonenumber: req.body.phonenumber,
          },
          { where: { id: req.params.id } }
        );
        res
          .status(200)
          .json({ data: null, message: '성공적으로 변경되었습니다.' });
      } catch (err) {
        console.log(err);
      }
    }
  } catch (err) {
    console.log(err);
  }
  // } else {
  //   res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  // }
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

module.exports = router;
