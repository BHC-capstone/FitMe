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
            request: req.body.request,
            };
            requests.create(newRequest).then(() => {
            res.status(200).json({ data: null, message: '성공적으로 신청되었습니다.' });
            });
        } else {
            res.status(401).json({ data: null, message: '' });
        }
        });
    } else {
        res.status(401).json({ data: null, message: '' });
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
            res.status(200).json({ data: null, message: '성공적으로 삭제되었습니다.' });
        } else {
            res.status(401).json({ data: null, message: '' });
        }
        });
    } else {
        res.status(401).json({ data: null, message: '' });
    }
    });