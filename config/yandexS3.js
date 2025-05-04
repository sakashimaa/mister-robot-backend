const { S3Client } = require('@aws-sdk/client-s3');
require('dotenv').config();

const yandexS3Client = new S3Client({
    region: process.env.YANDEX_REGION,
    endpoint: process.env.YANDEX_STORAGE_ENDPOINT,
    credentials: {
        accessKeyId: process.env.YANDEX_ACCESS_KEY_ID,
        secretAccessKey: process.env.YANDEX_SECRET_KEY,
    },
});

module.exports = yandexS3Client;