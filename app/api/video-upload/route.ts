import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';
import { PrismaClient } from '@prisma/client';


const prisma = new PrismaClient();

// Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// This TypeScript interface defines the structure of the Cloudinary response object after a successful upload.
interface CloudinaryUploadResult {
    public_id: string;
    bytes: number;
    duration?: number;
    [key: string]: any
}


export async function POST(request: NextRequest) {

    try {

        // Retrieving the userId of the current user from Clerk.
        const { userId } = auth();

        // Authorization Check.
        if (!userId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Cloudinary credentials Check.
        if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
            !process.env.CLOUDINARY_API_KEY ||
            !process.env.CLOUDINARY_API_SECRET) {
            return NextResponse.json({ error: "Cloudinary credentials not found" }, { status: 500 });
        }

        // Retrieves the file and other details from the form data, casting the file as a File object if available; if no file is found, it’s set to null.
        const formData = await request.formData();
        const file = formData.get("file") as File | null;
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const originalSize = formData.get("originalSize") as string;

        if (!file) {
            return NextResponse.json({ error: "File not found" }, { status: 400 })
        }

        // Converts the uploaded file to an array buffer and then converts this array buffer into a Buffer object.
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
                // Creates a stream that uploads the video to the specified folder after transformation in Cloudinary.
                const uploadStream = cloudinary.uploader.upload_stream(
                    { 
                        resource_type: "video",
                        folder: "SAAS-01-upload-videos",
                        transformation: [{quality:"auto", fetch_format:"mp4"}] 
                    },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                    }
                )
                // Signals the end of data streaming to Cloudinary, initiating the actual upload.
                uploadStream.end(buffer);
            }
        )

        const video = await prisma.video.create({
           data:{
            title,
            description,
            publicId: result.public_id,
            originalSize,
            compressedSize: String(result.bytes),
            duration: result.duration || 0
           }
        })

        return NextResponse.json(video);

    } catch (error) {
        console.log("Upload video failed", error);
        return NextResponse.json({ error: "Upload video failed" }, { status: 500 });
    } finally{
        await prisma.$disconnect();
    }
}