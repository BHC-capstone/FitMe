const request = require('supertest');
const app = require('../app');

describe('User Signup', () => {
  it('정상적인 요청이 들어와 회원가입되는 경우', async () => {
    const response = await request(app).post('/users/signup').send({
      email: 'user153@ajou.ac.kr',
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

  //test

  // it('해당하는 이메일이 이미 존재하는 경우', async () => {
  //   const response = await request(app).post('/users/signup').send({
  //     email: 'user@ajou.ac.kr',
  //     name: '박진명',
  //     password: '1234',
  //     age: 25,
  //     gender: 'male',
  //     phonenumber: '01012341234',
  //   });

  //   expect(response.status).toBe(409);
  //   expect(response.body.message).toBe('이미 존재하는 아이디입니다');
  //   expect(response.body.data).toBeNull();
  // });
});
