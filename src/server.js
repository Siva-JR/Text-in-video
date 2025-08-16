const express = require('express');
const multer = require('multer');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const port = 5000;

app.use(cors());

// Configure Multer for in-memory storage, which is ideal for direct uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const r2Client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT_URL,
    credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
});

app.post('/upload-video', upload.single('video'), async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(400).send('No file uploaded.');
        }

        const uploadParams = {
            Bucket: process.env.R2_BUCKET_NAME,
            Key: file.originalname, // Use the original filename as the object key
            Body: file.buffer, // Multer's in-memory buffer
            ContentType: file.mimetype,
        };

        const command = new PutObjectCommand(uploadParams);
        await r2Client.send(command);

        const fileUrl = `${process.env.R2_ENDPOINT_URL}/${process.env.R2_BUCKET_NAME}/${file.originalname}`;
        res.status(200).json({ url: fileUrl, message: 'File uploaded successfully!' });
    } catch (error) {
        console.error('Error uploading to R2:', error);
        res.status(500).send('Upload failed.');
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});