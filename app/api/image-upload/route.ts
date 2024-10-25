import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { auth } from '@clerk/nextjs/server';


// Configuration
cloudinary.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


// This TypeScript interface defines the structure of the Cloudinary response object after a successful upload.
interface CloudinaryUploadResult {
    public_id: string;
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

        // Retrieves the file from the form data, casting it as a File object if available; if no file is found, it’s set to null.
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "File not found" }, { status: 400 })
        }

        // Converts the uploaded file to an array buffer and then converts this array buffer into a Buffer object.
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise<CloudinaryUploadResult>(
            (resolve, reject) => {
                // Creates a stream that uploads the image to the specified folder in Cloudinary.
                const uploadStream = cloudinary.uploader.upload_stream(
                    { folder: "SAAS-01-upload-images" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result as CloudinaryUploadResult);
                    }
                )
                // Signals the end of data streaming to Cloudinary, initiating the actual upload.
                uploadStream.end(buffer);
            }
        )

        return NextResponse.json({ publicId: result.public_id }, { status: 200 });

    } catch (error) {
        console.log("Upload image failed", error);
        return NextResponse.json({ error: "Upload image failed" }, { status: 500 });
    }
}