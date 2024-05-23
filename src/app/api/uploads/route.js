import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import uniqid from "uniqid";

export async function POST(req) {
    // Check if there are uploaded files in the request
    if (!req.files || req.files.length === 0) {
        return Response.json({ error: "No files uploaded" });
    }

    const s3Client = new S3Client({
        region: 'eu-north-1',
        credentials: {
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_KEY,
        },
    });

    const uploadedLinks = [];

    // Loop through each uploaded file
    for (const file of req.files) {
        const ext = file.name.split('.').slice(-1)[0];
        const newFileName = uniqid() + '.' + ext;

        const chunks = [];
        for await (const chunk of file.stream()) {
            chunks.push(chunk);
        }
        const buffer = Buffer.concat(chunks);

        const bucket = 'haute-app';

        try {
            await s3Client.send(new PutObjectCommand({
                Bucket: bucket,
                Key: newFileName,
                ACL: 'public-read',
                ContentType: file.type,
                Body: buffer,
            }));

            const link = 'https://' + bucket + '.s3.amazonaws.com/' + newFileName;
            uploadedLinks.push(link);
        } catch (error) {
            console.error("Error uploading file:", error);
            // Handle upload errors gracefully (e.g., return an error response)
            return Response.json({ error: "Failed to upload files" });
        }
    }

    // Return array of uploaded image links
    return Response.json(uploadedLinks);
}
