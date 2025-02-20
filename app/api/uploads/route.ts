import { NextRequest, NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function POST(req: NextRequest) {
    try {
        // Parse formData
        const formData = await req.formData();
        const file = formData.get('file') as File;
        const userId = formData.get('userId') as string;

        if (!file || !userId) {
            return NextResponse.json({ error: 'Missing file or userId' }, { status: 400 });
        }

        // Read file buffer
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Get file extension from MIME type
        const mimeType = file.type;
        const extensionMap: { [key: string]: string } = {
            'image/jpeg': 'jpg',
            'image/png': 'png',
            'image/webp': 'webp',
        };

        const extension = extensionMap[mimeType] || 'jpg'; // Default to 'jpg' if unknown

        // Generate a unique file name
        const uniqueFileName = `${userId}_${Date.now()}-${crypto.randomUUID()}.${extension}`;

        // Define S3 bucket and key
        const bucketName = process.env.AWS_BUCKET_NAME!;
        //const objectKey = `${userId}/${uniqueFileName}`; // Folder inside S3 bucket
        const objectKey = `public/${uniqueFileName}`; // Folder inside S3 bucket

        // Upload to S3
        await s3.send(
            new PutObjectCommand({
                Bucket: bucketName,
                Key: objectKey,
                Body: buffer,
                ContentType: mimeType,
                //ACL: 'public-read', // Make it publicly accessible (if needed)
            })
        );

        // Construct the S3 URL
        const imageUrl = `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${objectKey}`;
        //const url = "https://handcraftedproducts.s3.eu-west-1.amazonaws.com/public/"
        console.log("imageUrl form api/uploads:", imageUrl);
        return NextResponse.json({ imageUrl });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// import { NextRequest, NextResponse } from 'next/server';
// import { writeFile } from 'fs/promises';
// import path from 'path';

// export async function POST(req: NextRequest) {
//     try {
//         // Parse formData
//         const formData = await req.formData();
//         const file = formData.get('file') as File;
//         const userId = formData.get('userId') as string;

//         if (!file || !userId) {
//             return NextResponse.json({ error: 'Missing file or userId' }, { status: 400 });
//         }

//         // Read file buffer
//         const bytes = await file.arrayBuffer();
//         const buffer = Buffer.from(bytes);

//         // Get file extension from MIME type
//         const mimeType = file.type;
//         const extensionMap: { [key: string]: string } = {
//             'image/jpeg': 'jpg',
//             'image/png': 'png',
//             'image/webp': 'webp',
//         };

//         const extension = extensionMap[mimeType] || 'jpg'; // Default to 'jpg' if unknown

//         // Function to generate a unique filename
//         function generateUniqueFileName(userId: string, originalFileName: string) {
//             // Extract the file extension (e.g., 'png', 'jpg', 'jpeg')
//             const extension = path.extname(originalFileName).toLowerCase().replace('.', '') || 'jpg';

//             // Generate a unique identifier
//             const uniqueId = `${Date.now()}-${crypto.randomUUID()}`;

//             // Construct the filename (UserID + UniqueID + Correct Extension)
//             return `${userId}_${uniqueId}.${extension}`;
//         }


//         // Define file path in the /public folder
//         const fileName = generateUniqueFileName(userId, file.name);
//         //const fileName = `${userId}_profilePic.${extension}`;
//         const filePath = path.join(process.cwd(), 'public', fileName);

//         // Save the file
//         await writeFile(filePath, buffer);

//         // Return the accessible URL of the image
//         const imageUrl = `/${fileName}`; // Publicly accessible under `/public`
//         return NextResponse.json({ imageUrl });
//     } catch (error) {
//         console.error('Upload error:', error);
//         return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//     }
// }