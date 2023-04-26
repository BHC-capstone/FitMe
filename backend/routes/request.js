var express = require('express');
var router = express.Router();
const { users } = require('../models');

// pt 요청
router.post('/request', (req, res) => {
    if (req.body.username && req.body.password) {
        users.findOne({
        where: { username: req.body.username, password: req.body.password },
        }).then((userInfo) => {
        if (userInfo != undefined) {
            const newRequest = {
            username: req.body.username,
            trainer: req.body.trainer,
            date: req.body.date,
            time: req.body.time,
            place: req.body.place,
            request: req.body.request,
            };
            requests.create(newRequest).then(() => {
            res.send('성공적으로 신청되었습니다.');
            res.end();
            });
        } else {
            res.send('아이디와 비밀번호를 확인하세요!');
            res.end();
        }
        });
    } else {
        res.send('아이디와 비밀번호를 입력하세요!');
        res.end();
    }
    });

// pt 요청 삭제
router.post('/request/delete', (req, res) => {
    if (req.body.username && req.body.password) {
        users.findOne({
        where: { username: req.body.username, password: req.body.password },
        }).then((userInfo) => {
        if (userInfo != undefined) {
            requests.destroy({
            where: { username: req.body.username, request: req.body.request },
            });
            res.send('성공적으로 삭제되었습니다.');
            res.end();
        } else {
            res.send('아이디와 비밀번호를 확인하세요!');
            res.end();
        }
        });
    } else {
        res.send('아이디와 비밀번호를 입력하세요!');
        res.end();
    }
    });