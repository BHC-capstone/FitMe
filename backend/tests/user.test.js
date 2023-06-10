const request = require('supertest');
const app = require('../app');
const fs = require('fs');
let users = require('../models').users;
let superagent = require('superagent');
let https = require('https');
const path = require('path');

// user signup test

const sequelize = require('../models').sequelize;
let createdUser = null;
let testUser = null;
let server;
let agent = null;

let serverOptions;

beforeAll(async () => {
  serverOptions = {
    ca: fs.readFileSync(__dirname + '/../ca.pem'),
    key: fs.readFileSync(__dirname + '/../key.pem'),
    cert: fs.readFileSync(__dirname + '/../cert.pem'),
  };
  server = https
    .createServer(
      {
        ca: fs.readFileSync(__dirname + '/../ca.pem'),
        key: fs.readFileSync(__dirname + '/../key.pem'),
        cert: fs.readFileSync(__dirname + '/../cert.pem'),
      },
      app,
      () => {
        agent = superagent.agent(server);
      },
    )
    .listen(4000);

  await sequelize.sync({});

  testUser = {
    id: 8971,
    email: 'testUser@ajou.ac.kr',
    name: '박테스트',
    password: '$2b$10$Vv3rIFGpwIHqZPt2KdBmGuJCco9awL/OJBvxtCgScqbVFTEmkTgNK', //1234 encrypt
    age: 25,
    gender: 'male',
    phonenumber: '01012341234',
    s3_key: 'testS3Key',
  };
  createdUser = await users.create(testUser);
}, 60000);

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

describe('User Profile', () => {
  test('정상적으로 profile을 보내주는 경우', async () => {
    let loginResponse = await request(app)
      .post('/users/login')
      .send({
        email: testUser.email,
        password: '1234',
      })
      .timeout(10000);

    console.log(loginResponse.body);
    console.log(createdUser.id);
    const response = await request(app)
      .get(`/users/profile/${loginResponse.body.data.id}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('');
    expect(response.body.data).toEqual({
      id: createdUser.id,
      email: createdUser.email,
      name: createdUser.name,
      age: createdUser.age,
      gender: createdUser.gender,
      phonenumber: createdUser.phonenumber,
    });
  });
});

describe('User Change Password', () => {
  test('User가 올바른 비밀번호를 입력하여 비밀번호 변경에 성공하는 경우', async () => {
    const response = await request(app)
      .post(`/users/profile/changePassword/${testUser.id}`)
      .send({
        currentPassword: '1234',
        newPassword: '45678',
        newPassword2: '45678',
      });

    expect(response.status).toBe(200);
    expect(response.body.data).toBeNull();
    expect(response.body.message).toBe('성공적으로 비밀번호가 변경되었습니다.');
  });

  test('User가 유효하지 않아 에러메시지와 함께 실패하는 경우 ', async () => {
    const response = await request(app)
      .post('/users/profile/changePassword/non-existent-id')
      .send({
        currentPassword: '1234',
        newPassword: '5678',
        newPassword2: '5678',
      });

    expect(response.status).toBe(500);
    expect(response.body.data).toBeNull();
    expect(response.body.message).toBe('서버 오류가 발생했습니다.');
  });

  test('비밀번호를 잘못 입력하여 에러 메시지가 출력되는 경우', async () => {
    const response = await request(app)
      .post(`/users/profile/changePassword/${8971}`)
      .send({
        currentPassword: '1234',
        newPassword: '45678',
        newPassword2: '45678',
      });

    expect(response.status).toBe(401);
    expect(response.body.data).toBeNull();
    expect(response.body.message).toBe('현재 비밀번호가 일치하지 않습니다.');
  });

  test('비밀번호와 비밀번호 확인에 입력된 값이 서로 같지 않은 경우', async () => {
    const response = await request(app)
      .post(`/users/profile/changePassword/${testUser.id}`)
      .send({
        currentPassword: '45678',
        newPassword: '1234',
        newPassword2: '1348',
      });

    expect(response.status).toBe(401);
    expect(response.body.data).toBeNull();
    expect(response.body.message).toBe(
      '입력된 새 비밀번호가 일치하지 않습니다.',
    );
  });
});

describe('User request profile Image', () => {
  test('유효한 User가 Profile 사진을 요청하는 경우', async () => {
    const response = await request(app).get(`/users/profileImg/${testUser.id}`);

    expect(response.status).toBe(200);
  });
});

describe('User Withdrawal', () => {
  let agent;

  beforeEach(() => {
    agent = superagent.agent();
  });
  test('로그인 된 상태에서 정상적으로 회원탈퇴하는 경우', async () => {
    let loginResponse = await request(app)
      .post('/users/login')
      .send({
        email: testUser.email,
        password: '1234',
      })
      .timeout(10000);

    const response = await request(app)
      .post(`/users/withdraw/${createdUser.id}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('성공적으로 탈퇴되었습니다');
    expect(response.body.data).toBeNull();
  });
});
