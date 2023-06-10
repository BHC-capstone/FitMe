const request = require('supertest');
const app = require('../app');
let trainers = require('../models').trainers;
let trainer_sign_request = require('../models').trainer_sign_request;
let fs = require('fs');
let path = require('path');

const sequelize = require('../models').sequelize;
beforeAll(async () => {
  await sequelize.sync({});
}, 60000);

const testDir = path.join(__dirname, 'files');
const testFilePath = path.join(testDir, 'test-file.jpg');
fs.writeFileSync(testFilePath, '테스트 파일');

// trainer signup test
describe('Trainer Signup', () => {
  afterAll(async () => {
    await trainer_sign_request.destroy({
      where: {
        email: 'testTrainer@ajou.ac.kr',
      },
    });
  });

  it('정상적인 요청이 들어와 회원가입되는 경우', async () => {
    const response = await request(app)
      .post('/trainers/signup')
      .field('email', 'testTrainer@ajou.ac.kr')
      .field('name', '박진명_tr')
      .field('password', '1234')
      .field('age', '30')
      .field('gender', 'male')
      .field('phonenumber', '01012345678')
      .field('introduction', '트레이너 소개')
      .field('pt_point', '100')
      .field('Content-Type', 'multipart/form-data')
      .attach('certificationFile', testFilePath);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('회원가입 신청이 완료되었습니다.');
    expect(response.body.data).toBeNull();
  }, 10000);

  it('필수 정보가 충분하지 않아 에러 메시지를 전송해야 하는 경우', async () => {
    const response = await request(app).post('/trainers/signup').send({
      email: 'trainer2@ajou.ac.kr',
      name: '박진명_tr',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('모든 정보를 입력하세요');
    expect(response.body.data).toBeNull();
  });

  it('해당하는 이메일이 이미 존재하는 경우', async () => {
    const response = await request(app).post('/trainers/signup').send({
      email: 'trainer@ajou.ac.kr',
      name: '박진명_tr',
      password: '1234',
      age: 30,
      gender: 'male',
      phonenumber: '01012345678',
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('이미 존재하는 이메일입니다.');
    expect(response.body.data).toStrictEqual({ email: 'trainer@ajou.ac.kr' });
  });
});
