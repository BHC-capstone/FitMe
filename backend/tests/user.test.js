const request = require('supertest');
const session = require('supertest-session');
const app = require('../app');
const fs = require('fs');
let users = require('../models').users;
let agent = require('supertest').agent(app);
let https = require('https');

// user signup test

const sequelize = require('../models').sequelize;
let createdUser = null;
let testUser = null;
let server;

beforeAll(async () => {
  server = https
    .createServer(
      {
        ca: fs.readFileSync(__dirname + '/../ca.pem'),
        key: fs.readFileSync(__dirname + '/../key.pem'),
        cert: fs.readFileSync(__dirname + '/../cert.pem'),
      },
      app,
    )
    .listen(PORT);

  await sequelize.sync({});

  testUser = {
    email: 'testUser@ajou.ac.kr',
    name: '박테스트',
    password: '$2b$10$Vv3rIFGpwIHqZPt2KdBmGuJCco9awL/OJBvxtCgScqbVFTEmkTgNK', //1234 encrypt
    age: 25,
    gender: 'male',
    phonenumber: '01012341234',
  };
  createdUser = await users.create(testUser);
}, 60000);

beforeEach(() => {
  agent = request.agent(server);
});

afterAll(async () => {
  await users.destroy({
    where: {
      email: 'testUser@ajou.ac.kr',
    },
  });
}, 60000);

describe('User Signup', () => {
  afterAll(async () => {
    await users.destroy({
      where: {
        email: 'newUser2@ajou.ac.kr',
      },
    });
  });

  it('정상적인 요청이 들어와 회원가입되는 경우', async () => {
    const response = await request(app).post('/users/signup').send({
      email: 'newUser2@ajou.ac.kr',
      name: '박진명',
      password: '1234',
      age: '25',
      gender: 'male',
      phonenumber: '01012341234',
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('회원가입을 환영합니다');
    expect(response.body.data).toBeNull();
  });
  it('field 가 충분치 않아 에러 메시지를 전송해야 하는 경우', async () => {
    const response = await request(app).post('/users/signup').send({
      email: 'user2@ajou.ac.kr',
      name: '박진명',
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('모든 정보를 입력하세요');
    expect(response.body.data).toBeNull();
  });

  it('해당하는 이메일이 이미 존재하는 경우', async () => {
    const response = await request(app).post('/users/signup').send({
      email: 'user@ajou.ac.kr',
      name: '박진명',
      password: '1234',
      age: 25,
      gender: 'male',
      phonenumber: '01012341234',
    });

    expect(response.status).toBe(409);
    expect(response.body.message).toBe('이미 존재하는 이메일입니다');
    expect(response.body.data).toBeNull();
  });
});

describe('User Login', () => {
  test('정상적인 요청을 통해 로그인하는 경우', async () => {
    const response = await request(app).post('/users/login').send({
      email: testUser.email,
      password: '1234',
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('로그인에 성공하였습니다');
    expect(response.body.data.email).toBe(testUser.email);
  });

  test('비밀번호가 일치하지 않는 경우', async () => {
    const invalidUser = {
      email: testUser.email,
      password: '159971',
    };
    const response = await request(app).post('/users/login').send(invalidUser);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe('비밀번호가 일치하지 않습니다');
    expect(response.body.data).toBeNull();
  });

  test('해당하는 이메일이 없어 에러 메시지를 전송하는경우', async () => {
    const invalidUser = {
      email: 'nonexistent@ajou.ac.kr',
      password: '1234',
    };

    const response = await request(app).post('/users/login').send(invalidUser);
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      '이메일 혹은 비밀번호가 일치하지 않습니다',
    );
    expect(response.body.data).toBeNull();
  });

  test('이메일과 비밀번호가 잘못된 경우', async () => {
    const response = await request(app).post('/users/login').send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('이메일과 비밀번호를 입력하세요');
    expect(response.body.data).toBeNull();
  });
});

describe('User Logout', () => {
  test('로그아웃 요청에 성공하는 경우', async () => {
    const response = await request(app).get('/users/logout');

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('성공적으로 로그아웃되었습니다');
    expect(response.body.data).toBeNull();
  });
});

describe('User Withdrawal', () => {
  beforeAll(async () => {});
  test('로그인 된 상태에서 정상적으로 회원탈퇴하는 경우', async () => {
    let cookies;

    let loginResponse = await request(server)
      .post('/users/login')
      .withCredentials()
      .send({
        email: testUser.email,
        password: '1234',
      })
      .timeout(10000);

    cookies = loginResponse.header['Set-Cookie'];
    console.log(loginResponse);

    const response = await request(server)
      .post(
        `https://127.0.0.1:4000/users/withdraw/${loginResponse.body.data.id}`,
      )
      .withCredentials(true)
      .set('Cookie', cookies)
      .send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('성공적으로 탈퇴되었습니다');
    expect(response.body.data).toBeNull();
  });

  test('로그인되지 않은 상태에서 탈퇴 요청 시 에러 메시지를 받아야 하는 경우', async () => {
    const response = await agent
      .post(`/users/withdraw/${createdUser.id}`)
      .withCredentials(true);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe('로그인 하세요');
    expect(response.body.data).toBeNull();
  });
});

//supertest session with https
