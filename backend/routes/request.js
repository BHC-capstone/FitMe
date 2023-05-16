var express = require('express');
var router = express.Router();
const { users, trainers, pt_requests, trainer_manage } = require('../models');


// pt 요청 
router.post('/ptrequest', (req, res) => {
        pt_requests.findOne({
            where: { trainer_id: req.body.trainer_id, user_id: req.body.id },
        }).then((requestInfo) => {
        if (requestInfo == undefined) {
            const newRequest = {
            user_id: req.body.id,
            trainer_id: req.body.trainer_id,
            date: req.body.startDate,
            count: req.body.count,
            request: req.body.request,
            days: req.body.days,
            };
            pt_requests.create(newRequest).then(() => {
            res.status(200).json({ data: null, message: '성공적으로 신청되었습니다.' });
            });
        } else {
            res.status(401).json({ data: null, message: '이미 신청한 trainer입니다' });
        }
        });
});

// user pt 요청 조회
router.get('/checklist/:id', (req, res) => {
        if (req.session.loggedin){
        const { id } = req.params;
        pt_requests.findAll({
            where: { user_id: id },
        }).then((requestInfo) => {
        if (requestInfo != undefined) {
            res.status(200).json({ data: requestInfo, message: '' });
        } else {
            res.status(401).json({ data: null, message: '' });
        }
        });
    } else {
        res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
    }
});


// pt 요청 삭제
router.post('/delete/:user_id/:id', (req, res) => {
        const { user_id, id } = req.params;
        pt_requests.findOne({
            where: { user_id: user_id},
        }).then((requestInfo) => {
        if (requestInfo != undefined) {
            pt_requests.destroy({
            where: { user_id: user_id, id: id },
            });
            res.status(200).json({ data: null, message: '성공적으로 삭제되었습니다.' });
        } else {
            res.status(401).json({ data: null, message: '' });
        }
        });
});




// trainer pt 요청 조회
router.get('/checklists/:id', (req, res) => {
    if (req.session.loggedin){
    const { id } = req.params;
    pt_requests.findAll({
        where: { trainer_id: id },
    }).then((requestInfo) => {
    if (requestInfo != undefined) {
        res.status(200).json({ data: requestInfo, message: '' });
    } else {
        res.status(401).json({ data: null, message: '' });
    }
    });
} else { 
    console.log('checklists');
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
}
});

// trainer pt 요청 user 조회
router.get('/checklists/:id/:user_id', (req, res) => {
    if (req.session.loggedin){
    try {
      const { id, user_id } = req.params;
      const bodyInfo = bodycheck.findOne({
        where: { user_id: user_id , last: true },
      });
      const requestInfo = pt_requests.findOne({
        where: { trainer_id: id, user_id: user_id },
      });
      res.status(200).json({ data: [requestInfo, bodyInfo], message: '' });
    } catch (err) {
      console.log(err);
    }
} else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
}
});




// pt 요청 수락
router.post('/accept/:trainer_id/:id', (req, res) => {
    const { trainer_id, id } = req.params;
    pt_requests.findOne({
      where: { trainer_id: trainer_id, id: id },
    }).then((requestInfo) => {
      if (requestInfo != undefined) {
        pt_requests.update(
          {
            response: req.body.response,
            accept: true,
          },
          {
            where: { trainer_id: trainer_id, id: id },
          }
        ).then(() => {
          const trainerManage = {
            user_id: requestInfo.user_id,
            trainer_id: requestInfo.trainer_id,
            total_pt_count: requestInfo.count,
            remain_pt_count: requestInfo.count,
            manage_memo: requestInfo.request,
          };
          trainer_manage.create(trainerManage).then(() => {
            res.status(200).json({ data: null, message: '성공적으로 수락되었습니다.' });
          }).catch((error) => {
            res.status(500).json({ data: null, message: 'trainerManage insert 오류' });
          });
        }).catch((error) => {
          res.status(500).json({ data: null, message: error.message });
        });
      } else {
        res.status(401).json({ data: null, message: 'pt request가 존재하지 않습니다.' });
      }
    }).catch((error) => {
      res.status(500).json({ data: null, message: error.message });
    });
  });
  
  

// pt 요청 거절
router.post('/reject/:trainer_id/:id', (req, res) => {
    const { trainer_id, id } = req.params;
    pt_requests.findOne({
      where: { trainer_id: trainer_id, id: id },
    }).then((requestInfo) => {
      if (requestInfo != undefined) {
        pt_requests.update(
          {
            response: req.body.response,
            accept: false,
          },
          {
            where: { trainer_id: trainer_id, id: id },
          }
        ).then(() => {
          res.status(200).json({ data: null, message: '성공적으로 거절되었습니다.' });
        }).catch((error) => {
          res.status(500).json({ data: null, message: error.message });
        });
      } else {
        res.status(401).json({ data: null, message: 'pt request가 존재하지 않습니다.' });
      }
    }).catch((error) => {
      res.status(500).json({ data: null, message: error.message });
    });
  });




module.exports = router;