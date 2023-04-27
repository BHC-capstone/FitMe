var express = require('express');
var router = express.Router();
const { users } = require('../models');
const { trainers } = require('../models');
const { requests } = require('../models');

// pt 요청
router.post('/request', (req, res) => {
    if (req.session.loggedin) {
        users.findOne({
            where: { username: req.params.userid },
        }).then((requestInfo) => {
        if (requestInfo != undefined) {
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
    if (req.session.loggedin) {
        users.findOne({
            where: { username: req.params.userid },
        }).then((requestInfo) => {
        if (requestInfo != undefined) {
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

// pt 요청 수락
router.post('/request/accept', (req, res) => {
    if (req.session.loggedin) {
        trainers.findOne({
            where: { username: req.params.userid },
        }).then((requestInfo) => {
        if (requestInfo != undefined) {
            requests.update(
            {
                request: req.body.request,
            },
            {
                where: { username: req.params.userid },
            }
            );
            res.status(200).json({ data: null, message: '성공적으로 수락되었습니다.' });
        } else {
            res.status(401).json({ data: null, message: '' });
        }
        });
    } else {
        res.status(401).json({ data: null, message: '' });
    }
    }
);

// pt 요청 거절
router.post('/request/reject', (req, res) => {
    if (req.session.loggedin) {
        trainers.findOne({
            where: { username: req.params.userid },
        }).then((requestInfo) => {
        if (requestInfo != undefined) {
            requests.update(
            {
                request: req.body.request,
            },
            {
                where: { username: req.params.userid },
            }
            );
            res.status(200).json({ data: null, message: '성공적으로 거절되었습니다.' });
        } else {
            res.status(401).json({ data: null, message: '' });
        }
        });
    } else {
        res.status(401).json({ data: null, message: '' });
    }
    }
);

