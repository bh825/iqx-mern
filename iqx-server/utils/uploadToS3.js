const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3Client = new S3Client({
  region: "ap-south-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  }
});

module.exports = (Key, Body) => {
  return s3Client.send(new PutObjectCommand({ Bucket: "coretus-hrms", Key, Body, ACL: "public-read" }));
};
