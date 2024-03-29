const fs = require('fs');
const https = require('https');
const app = require('./app');

const PORT = process.env.PORT || 4000;

// let server = https
//   .createServer(
//     {
//       ca: fs.readFileSync(__dirname + '\\ca.pem'),
//       key: fs.readFileSync(__dirname + '\\key.pem'),
//       cert: fs.readFileSync(__dirname + '\\cert.pem'),
//     },
//     app,
//   )
//   .listen(PORT);
let server;
// 인증서 파일들이 존재하는 경우에만 https 프로토콜을 사용하는 서버를 실행
if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  server = https
    .createServer(
      {
        key: fs.readFileSync(__dirname + `/` + 'key.pem', 'utf-8'),
        cert: fs.readFileSync(__dirname + `/` + 'cert.pem', 'utf-8'),
      },
      app,
    )
    .listen(PORT);
} else {
  server = app.listen(PORT);
}
