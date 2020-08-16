const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

aws.config.update({
    accessKeyId: process.env.S3_KEY, // stored in the .env file
    secretAccessKey: process.env.S3_SECRET, // stored in the .env file
    region: process.env.BUCKET_REGION // This refers to your bucket configuration.
})

const s3 = new aws.S3()

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'testing-us-east-testing',
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, { fieldName: 'testing' });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
})
module.exports = upload;
