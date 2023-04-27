var express = require('express');
var router = express.Router();
const { trainers } = require('../models');
const { users } = require('../models');

// pt 요청 수락 
router.post('/accept', async (req, res) => {
    const { id, trainerId } = req.body;
    try{
    await trainers.update(
        { trainerId: trainerId },
        { where: { id: id } }
    );
    res.status(200).json({ data: null, message: '성공적으로 수락되었습니다.' });
    }
    catch(err){
        console.log(err);
    }
});

// pt 요청 거절 
router.post('/reject', async (req, res) => {
    const { id } = req.body;
    try{
    await trainers.destroy({ where: { id: id } });
    res.status(200).json({ data: null, message: '성공적으로 거절되었습니다.' });
    }
    catch(err){
        console.log(err);
    }
});

