var express = require('express');
var router = express.Router();
const { users } = require('../models');
const { trainers } = require('../models');
const { pt_requests } = require('../models');

// pt 요청
router.post('/request/:id', (req, res) => {
    if (req.session.loggedin) {
        users.findOne({
            where: { id: req.params.id },
        }).then((requestInfo) => {
        if (requestInfo != undefined) {
            const newRequest = {
            user_id: req.body.user_id,
            trainer_id: req.body.trainer_id,
            date: req.body.date,
            time: req.body.time,
            request: req.body.request,
            };
            pt_requests.create(newRequest).then(() => {
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
router.post('/request/delete/:id', (req, res) => {
    if (req.session.loggedin) {
        users.findOne({
            where: { id: req.params.id },
        }).then((requestInfo) => {
        if (requestInfo != undefined) {
            pt_requests.destroy({
            where: { user_id: req.body.id, request: req.body.request },
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
router.post('/request/accept/:id', (req, res) => {
    if (req.session.loggedin) {
        trainers.findOne({
            where: { id: req.params.id },
        }).then((requestInfo) => {
        if (requestInfo != undefined) {
            pt_requests.update(
            {
                response: req.body.response,
                accept: req.body.accept,
            },
            {
                where: { id: req.params.id },
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
router.post('/request/reject/:id', (req, res) => {
    if (req.session.loggedin) {
        trainers.findOne({
            where: { id: req.params.id },
        }).then((requestInfo) => {
        if (requestInfo != undefined) {
            pt_requests.update(
            {
                response: req.body.response,
                accept: req.body.accept,
            },
            {
                where: { id: req.params.id },
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

