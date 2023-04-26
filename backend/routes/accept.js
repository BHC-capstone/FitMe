var express = require('express');
var router = express.Router();
const { trainers } = require('../models');

//persnal training accept
router.post('/accept', (req, res) => {
    const { id, trainerId } = req.body;
    const sql = `UPDATE personal_trainings SET trainerId = ${trainerId} WHERE id = ${id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('성공적으로 수락되었습니다.');
    });
});

// personal training reject
router.post('/reject', (req, res) => {
    const { id } = req.body;
    const sql = `DELETE FROM personal_trainings WHERE id = ${id}`;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send('성공적으로 거절되었습니다.');
    }
    );
});
