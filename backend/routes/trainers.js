var express = require('express');
var router = express.Router();
const { trainers } = require('../models');


// trainer signup
router.post('/signup', async function (req, res) {
  if (
    (req.body.username,
    req.body.password,
    req.body.password2,
    req.body.email,
    req.body.age,
    req.body.gender)
  ) {
    try{
    const trainerInfo = await trainers.findOne({
      where: { username: req.body.username, password: req.body.password },
    });

    if (trainerInfo != undefined) res.status(409).send('이미 존재하는 아이디입니다');
    else {
      const result = await trainers.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        gender: req.body.gender,
      });
      res.status(200).json({ data: null, message: '회원가입을 환영합니다' });
    }}
    catch(err){
      console.log(err);
    }
  } else {
    res.status(400).json({ data: null, message: '모든 정보를 입력하세요' });
  }
});

// trainer login
router.post('/login', async function (req, res) {
  if (req.body.username && req.body.password) {
    try{
    const trainerInfo = await trainers.findOne({
      where: { username: req.body.username, password: req.body.password },
    });

    if (trainerInfo != undefined) {
      req.session.loggedin = true;
      req.session.username = req.body.username;
      res.redirect('/');
      res.end();
    } else {
      res.status(401).json({ data: null, message: '로그인 정보가 일치하지 않습니다' });
    }
    }
    catch(err){
      console.log(err);
    }
  } else {
    res.status(400).json({ data: null, message: '아이디와 비밀번호를 입력하세요' });
  }
});

// trainers logout
router.get('/logout', function (req, res) {
  req.session.loggedin = false;
  res.status(200).json({ data: null, message: '성공적으로 로그아웃되었습니다' });
});

// trainer delete
router.post('/withdraw', async function (req, res) {
  if (req.body.username && req.body.password) {
    try{
    const trainerInfo = await trainers.findOne({
      where: { username: req.body.username, password: req.body.password },
    });
    if (trainerInfo != undefined) {
      await trainers.destroy({
        where: { username: req.body.username, password: req.body.password },
      });
      res.status(200).json({ data: null, message: '성공적으로 탈퇴되었습니다' });
    } else {
      res.status(401).json({ data: null, message: '아이디와 비밀번호를 확인하세요' });
    }
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
    where: { username: req.params.userid },
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
      where: { username: req.params.userid },
    });
    if (req.body.password != req.body.password2)
    res.status(401).json({ data: null, message: '입력된 비밀번호가 서로 다릅니다.' });
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
    res.status(200).json({ data: null, message: '성공적으로 변경되었습니다.' });
  }}
  catch(err){
    console.log(err);
  }
  } else { 
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});



// trainerlist paging
router.get('/trainerlist', async function (req, res) {
  const trainerInfo = trainers.findAll({
    attributes: ['name','age', 'gender', 'introduction']
  });
  res.send(trainerInfo);
});

// trainer search
router.get('/trainerlist/${}', async function (req, res) {
  try{  
  const trainerInfo = await trainers.findOne({
        where: { name: req.body.name },
    });
    if (trainerInfo != undefined) {
      res.status(200).json({ data: trainerInfo, message: '' });
    } else {
      res.status(200).json({ data: null, message: '검색결과가 없습니다' });
    }
  }
  catch(err){
    console.log(err);
  }
});

// trainer revenue
router.get('/revenue', async function (req, res) {
if (req.session.loggedin) {
  try{
  const trainerInfo = await trainers.findOne({
    where: { username: req.session.username },
  });
  res.status(200).json({ data: trainerInfo.point, message: '' });
  } 
  catch(err){
    console.log(err);
  }}
  else {
  res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});


module.exports = router;