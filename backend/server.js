const fs = require('fs');
const https = require('https');
const app = require('./app');

const PORT = process.env.PORT || 4000;

let server;
// 인증서 파일들이 존재하는 경우에만 https 프로토콜을 사용하는 서버를 실행
if (fs.existsSync('./key.pem') && fs.existsSync('./cert.pem')) {
  const option = {
    ca: fs.readFileSync('/etc/letsencrypt/live/fitme.p-e.kr/fullchain.pem'),
    key: fs.readFileSync('/etc/letsencrypt/live/fitme.p-e.kr/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/fitme.p-e.kr/cert.pem'),
  };

  server = https.createServer(option, app).listen(PORT, () => {});
} else {
  server = app.listen(PORT);
}
