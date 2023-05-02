var express = require('express');
var router = express.Router();
const { trainers } = require('../models');
const { pt_requests } = require('../models');


// trainer signup
router.post('/signup', async function (req, res) {
  if (
    (req.body.email,
     req.body.name,
     req.body.password,
     req.body.age,
     req.body.gender,
     req.body.phonenumber,
     req.body.introduction
    )
  ) {
    try{
    const trainerInfo = await trainers.findOne({
      where: { email: req.body.email },
      attributes: ['email'],
    });

    if (trainerInfo != undefined) res.status(409).send('이미 존재하는 아이디입니다');
    else {
      const result = await trainers.create({
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        phonenumber: req.body.phonenumber,
        introduction: req.body.introduction
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
  if (req.body.email && req.body.password) {
    try{
    const trainerInfo = await trainers.findOne({
      where: { email: req.body.email, password: req.body.password },
    });

    if (trainerInfo != undefined) {
      req.session.loggedin = true;
      req.session.email = req.body.email;
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
router.post('/withdraw/:id', async function (req, res) {
  if (req.session.loggedin) {
    try{
    const trainerInfo = await trainers.findOne({
      where: { id: req.body.id },
    });
    if (trainerInfo != undefined) {
      await trainers.destroy({
        where: { id: req.body.id },
      });
      res.status(200).json({ data: null, message: '성공적으로 탈퇴되었습니다' });
    }
    }
    catch(err){
      console.log(err);
    }
  } else {
    res.status(400).json({ data: null, message: '로그인 하세요' });
  }
});

// trainer info
router.get('/profile/:id', async function (req, res) {
  try{
  const trainerInfo = await trainers.findOne({
    where: { id: req.params.id },
    attributes: ['id','email','name','age', 'gender', 'phonenumber','introduction', 'carrer', 'review_avg'],
  });
  res.status(200).json({ data: trainerInfo, message: '' });
}
  catch(err){
    console.log(err);
  }
});

// trainer info change
router.post('/profile/changeProfile/:id', async function (req, res) {
  if (req.session.loggedin) {
    try{
    const trinersInfo = await trainers.findOne({
      where: { id: req.params.id },
    });
    if (req.body.password != req.body.password2)
    res.status(401).json({ data: null, message: '입력된 비밀번호가 서로 다릅니다.' });
  else {
    await trainers.update(
      {
        email: req.body.email,
        name: req.body.name,
        password: req.body.password,
        age: req.body.age,
        gender: req.body.gender,
        phonenumber: req.body.phnumber,
        introduction: req.body.introduction
      },
      { where: { id: req.params.id } }
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
  try{const trainerInfo = await trainers.find({
    attributes: ['id','trainer_id','name','age', 'gender', 'introduction', 'phonenumber', 'email', 'review_avg'],
  });
  res.status(200).json({ data: trainerInfo, message: '' });}
  catch(err){
    console.log(err);
  }
});

// trainer detail
router.get('/trainerlist/:id', async function (req, res) {
  try {
    const trainerInfo_detail = await trainers.findOne({
      where: { id: req.params.id },
      attributes: ['id', 'name', 'age', 'gender', 'phonenumber', 'email', 'introduction', 'career', 'review_avg']
    });
    const trainer_reviews = await trainer_review.findAll({
      where: { trainer_id: req.params.id }
    });
    res.status(200).json({ data: { trainerInfo_detail, trainer_reviews }, message: '' });
  } catch (err) {
    console.log(err);
  }
});

// trainer search
router.get('/trainerlist/${}', async function (req, res) {
  try{  
  const trainerInfo = await trainers.findAll({
        where: { name: req.params.name },
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
router.get('/revenue/:id', async function (req, res) {
if (req.session.loggedin) {
  try{
  const trainer_point_amount = await trainer_points.findOne({
    where: { trainer_id: req.params.id },
  });
  res.status(200).json({ data: trainer_point_amount, message: '' });
  } 
  catch(err){
    console.log(err);
  }}
  else {
  res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});

// check pt request list
router.get('/checkptrequest/:id', async function (req, res) {
  if (req.session.loggedin) {
    try{
    const check_pt_list = await pt_requests.findAll({
      where: { trainer_id: req.params.id },
    });
    res.status(200).json({ data: check_pt_list, message: '' });
    }
    catch(err){
      console.log(err);
    }
  } else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
  }
});



module.exports = router;