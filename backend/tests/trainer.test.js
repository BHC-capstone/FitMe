const request = require('supertest');
const app = require('../app');
const fs = require('fs');
let users = require('../models').users;
let superagent = require('superagent');
let https = require('https');
const path = require('path');
let trainers = require('../models').trainers;
let trainer_sign_request = require('../models').trainer_sign_request;

const sequelize = require('../models').sequelize;

const testDir = path.join(__dirname, 'files');
const testFilePath = path.join(testDir, 'test-file.jpg');
fs.writeFileSync(testFilePath, '테스트 파일');

let agent;
let serverOptions = {
  ca: fs.readFileSync(__dirname + '/../ca.pem'),
  key: fs.readFileSync(__dirname + '/../key.pem'),
  cert: fs.readFileSync(__dirname + '/../cert.pem'),
};

beforeAll(async () => {
  server = https
    .createServer(serverOptions, app, () => {
      agent = superagent.agent(server);
    })
    .listen(4000);

  await sequelize.sync({});
}, 60000);

afterAll(async () => {
  await trainer_sign_request.destroy({
    where: {
      email: 'testTrainer@ajou.ac.kr',
    },
  });

  server.close();
});

describe('Trainer Signup', () => {
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
      email: 'testTrainer@ajou.ac.kr',
      name: '박진명_tr',
      password: '1234',
      age: 30,
      gender: 'male',
      phonenumber: '01012345678',
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('이미 신청된 이메일입니다.');
    expect(response.body.data).toStrictEqual({
      email: 'testTrainer@ajou.ac.kr',
    });
  });
});

describe('Trainer Login', () => {
  let testTrainer;
  beforeAll(async () => {
    testTrainer = {
      id: 8971,
      email: 'testTrainer@ajou.ac.kr',
      name: '박테스트',
      password: '$2b$10$Vv3rIFGpwIHqZPt2KdBmGuJCco9awL/OJBvxtCgScqbVFTEmkTgNK', //1234 encrypt
      age: 25,
      gender: 'male',
      phonenumber: '01012341234',
    };
    createdUser = await trainers.create(testTrainer);
  });

  afterAll(async () => {
    await trainers.destroy({
      where: {
        email: testTrainer.email,
      },
    });
  });

  it('정상적인 요청을 통해 로그인 하는 경우', async () => {
    const response = await request(app)
      .post('/trainers/login')
      .send({ email: testTrainer.email, password: '1234' });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('로그인에 성공하였습니다');
    expect(response.body.data.email).toBe(testTrainer.email);
  });

  it('should return an error for incorrect password', async () => {
    // Send login request with incorrect password
    const response = await request(app)
      .post('/trainers/login')
      .send({ email: testTrainer.email, password: 'incorrectPassword' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('비밀번호가 일치하지 않습니다');
    expect(response.body.data).toBeNull();
  });

  it('should return an error for non-existent trainer', async () => {
    const response = await request(app)
      .post('/trainers/login')
      .send({ email: 'nonexistent@ajou.ac.kr', password: 'password123' });

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('로그인 정보가 일치하지 않습니다');
    expect(response.body.data).toBeNull();
  });

  it('should return an error for missing email or password', async () => {
    let response = await request(app)
      .post('/trainers/login')
      .send({ password: 'password123' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('이메일과 비밀번호를 입력하세요');
    expect(response.body.data).toBeNull();

    // Send login request without password
    response = await request(app)
      .post('/trainers/login')
      .send({ email: 'testTrainer@ajou.ac.kr' });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('이메일과 비밀번호를 입력하세요');
    expect(response.body.data).toBeNull();
  });
});
