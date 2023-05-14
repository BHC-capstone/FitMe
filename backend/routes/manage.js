var express = require('express');
var router = express.Router();
const { sequelize } = require('../models');
const { trainers, trainer_points, pt_requests, trainer_manage, user_tag, users } = require('../models');
const initModels = require('../models/init-models');
const models = initModels(sequelize);


router.get('/checkptuserlist/:id', async function (req, res) {
    if (req.session.loggedin) {
    try {
      const check_pt_user_list = await models.trainer_manage.findAll({
        where: { trainer_id: req.params.id },
        include: {
          model: users,
          as: 'user',
          attributes: ['name'],
          where: { id: sequelize.col('trainer_manage.user_id') }
        },
      });
      console.log(check_pt_user_list);
      const userListWithNames = check_pt_user_list.map((item) => {
        const { name } = item.user;
        return { ...item.toJSON(), name };
      });
      console.log(userListWithNames);
  
      res.status(200).json({ data: userListWithNames, message: '' });
    } catch (err) {
      console.log(err);
    }
    } else {
      res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
    }
  });

// check pt user detail
router.get('/checkptuserdetail/:user_id/:id', async function (req, res) {
  if (req.session.loggedin){
  try {
    const check_pt_user_detail = await trainer_manage.findOne({
      where: { trainer_id: req.params.id, user_id: req.params.user_id },
    });
    res.status(200).json({ data: check_pt_user_detail, message: '' });
  } catch (err) {
    console.log(err);
  }
} else {
    res.status(401).json({ data: null, message: '로그인이 필요합니다.' });
}
});

// user tag api
router.get('/tag/:user_id', async function (req, res) {
    try {
        const tagInfo = await user_tag.findAll({
            where: { user_id: req.params.user_id },

        });
        if (tagInfo != undefined) {
            res.status(200).json({ data: tagInfo, message: '' });
        } else {
            res.status(401).json({ data: null, message: '' });
        }
    } catch (err) {
        console.log(err);
    }
});

// user memo update api
router.post('/updatememo/:user_id/:id', async function (req, res) {
    try {
        await trainer_manage.update(
            {
                manage_memo: req.body.memo,
            },
            {
                where: { trainer_id: req.params.id, user_id: req.params.user_id },
            },
        );
        res.status(200).json({ data: null, message: '메모가 수정되었습니다.' });
    } catch (err) {
        console.log(err);
    }
});

//make tag
router.post('/maketag/:user_id/:trainer_id', async function (req, res) {
    try {
        const tagInfo = await user_tag.findOne({
            where: { user_id: req.params.user_id, tag_name: req.body.tag_name },
        });
        if (tagInfo != undefined) {
            res.status(401).json({ data: null, message: '이미 존재하는 태그입니다.' });
        } else { 
            const newTag = {
                user_id: req.params.user_id,
                trainer_id: req.body.trainer_id,
                tag_name: req.body.tag_name,
                tag_color: req.body.tag_color,
            };
            user_tag.create(newTag).then(() => {
                res.status(200).json({ data: null, message: '성공적으로 태그가 추가되었습니다.' });
            });
        }
    } catch (err) {
        console.log(err);
    }
});

// delete tag
router.post('/deletetag/:id', async function (req, res) {
    try {
        const tagInfo = await user_tag.findOne({
            where: { id: req.params.id },
        });
        if (tagInfo != undefined) {
            user_tag.destroy({
                where: { id: req.params.id },
            });
            res.status(200).json({ data: null, message: '성공적으로 태그가 삭제되었습니다.' });
        } else {  
            res.status(401).json({ data: null, message: '존재하지 않는 태그입니다.' });
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = router;
