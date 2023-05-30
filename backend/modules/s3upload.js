const multer = require("multer");
const AWS = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config();

const upload = multer({ storage: multer.memoryStorage() });

const videoUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("video/")) {
      cb(null, true);
    } else {
      cb(new Error("비디오만 업로드 가능합니다."));
    }
  },
});

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: "ap-northeast-2",
});

module.exports = {
  videoUpload,
  upload,
  s3,
};
