const { GetObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const yandexS3Client = require('../config/yandexS3');

exports.getImage = async(req, res) => {
    console.log(process.env.YANDEX_ACCESS_KEY_ID)
    console.log(process.env.YANDEX_SECRET_KEY);
    try {
        const { imageURL } = req.params;
        if (!imageURL) {
            res.status(400).json({message: 'imageURL обязателен'});
        }

        const command = new GetObjectCommand({
            Bucket: process.env.YANDEX_BUCKET,
            Key: imageURL
        });

        const url = await getSignedUrl(yandexS3Client, command, { expiresIn: 28000 });
        res.json({imageURL: url});
    } catch (err) {
        res.status(500).json({error: 'server error', message: err.message});
    }
};