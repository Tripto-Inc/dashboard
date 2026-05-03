import { S3Client } from '@aws-sdk/client-s3';

const client = new S3Client({
    forcePathStyle: true,
    region: process.env.STORAGE_REGION!,
    endpoint: process.env.STORAGE_URL!,
    credentials: {
        accessKeyId: process.env.STORAGE_ACCESS_KEY_ID!,
        secretAccessKey: process.env.STORAGE_SECRET_ACCESS_KEY!,
    }
})
