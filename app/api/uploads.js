import {
  CompleteMultipartUploadCommand,
  CreateMultipartUploadCommand,
  DeleteObjectCommand,
  ListPartsCommand,
  PutObjectCommand,
  S3Client,
  UploadPartCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export default async function handler(req, res) {
  const S3 = new S3Client({
    region: 'auto',
    endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID,
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
    },
  });

  switch (req.method) {
    case 'POST':
      if (req.body.multiPart) {
        const input = {
          Bucket: process.env.R2_BUCKET_NAME,
          Key: req.body.key,
        };
        const cmd = new CreateMultipartUploadCommand(input);
        const response = await S3.send(cmd);

        return res.status(200).json({ uploadID: response.UploadId });
      }

      if (req.body.uploadPart) {
        const signedUrl = await getSignedUrl(
          S3,
          new UploadPartCommand({
            Bucket: process.env.R2_BUCKET_NAME,
            Key: req.body.key,
            PartNumber: req.body.partNumber,
            UploadId: req.body.uploadID,
          }),
          { expiresIn: 60 * 5 }
        );

        return res.status(200).json({ signedUrl });
      }

      if (req.body.completePart) {
        const listPartsCmd = new ListPartsCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: req.body.key,
          UploadId: req.body.uploadID,
        });
        const response = await S3.send(listPartsCmd);
        const completeCmd = new CompleteMultipartUploadCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: req.body.key,
          UploadId: req.body.uploadID,
          MultipartUpload: {
            Parts: response.Parts.map((p) => ({
              PartNumber: p.PartNumber,
              ETag: p.ETag,
            })),
          },
        });
        const completeRes = await S3.send(completeCmd);
        return res.status(200).json({ ...completeRes });
      }

      const signedUrl = await getSignedUrl(
        S3,
        new PutObjectCommand({
          Bucket: process.env.R2_BUCKET_NAME,
          Key: req.body.key,
        }),
        { expiresIn: 60 * 5 }
      );

      return res.status(200).json({ signedUrl });

    case 'DELETE':
      const input = {
        Bucket: process.env.R2_BUCKET_NAME,
        Key: req.query.id,
      };
      const cmd = new DeleteObjectCommand(input);
      const cmdRes = await S3.send(cmd);
      return res.status(200).json({ ...cmdRes });
  }
}
