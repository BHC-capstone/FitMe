const multer = require('multer');
const AWS = require('aws-sdk');
const dotenv = require('dotenv');

dotenv.config();

const upload = multer({ storage: multer.memoryStorage() });
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

module.exports = {
  upload,
  s3,
};
