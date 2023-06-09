const request = require('supertest');
const app = require('../app');
let users = require('../models').users;
// user signup test

const sequelize = require('../models').sequelize;
beforeAll(async () => {
  await sequelize.sync({});
});

describe('User Signup', () => {
  afterAll(async () => {
    await users.destroy({
      where: {
        email: 'testUser@ajou.ac.kr',
      },
    });
  });

  it('정상적인 요청이 들어와 회원가입되는 경우', async () => {
    const response = await request(app).post('/users/signup').send({
      email: 'testUser@ajou.ac.kr',
      name: '박진명',
      password: '1234',
      age: 25,
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
  const testUser = {
    email: 'testUser@ajou.ac.kr',
    password: '$2b$10$Vv3rIFGpwIHqZPt2KdBmGuJCco9awL/OJBvxtCgScqbVFTEmkTgNK',
  };

  beforeAll(async () => {
    await users.create(testUser);
  });

  afterAll(async () => {
    await users.destroy({ where: { email: testUser.email } });
  });

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
      email: 'nonexistent@example.com',
      password: '1234',
    };

    const response = await request(app).post('/users/login').send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      '이메일 혹은 비밀번호가 일치하지 않습니다',
    );
    expect(response.body.data).toBeNull();
  });

  test('should return error message if email or password is missing', async () => {
    const response = await request(app).post('/users/login').send({});
    expect(response.status).toBe(400);
    expect(response.body.message).toBe('이메일과 비밀번호를 입력하세요');
    expect(response.body.data).toBeNull();
  });
});
