import { bucket } from "@/firebase";
import { getDownloadURL } from "firebase-admin/storage";

interface ParamType {
    params: {
        media_id: string[]
    }
}

export const GET = async (request: Request, { params }: ParamType) => {
    const { search } = new URL(request.url);
    const searchParams = new URLSearchParams(search);
    const width = searchParams.get('w');
    const height = searchParams.get('h');

    if (!params.media_id) {
        return new Response('Invalid url', { status: 404 });
    }

    const file_path = params.media_id.join('/');
    try {
        const fileRef = bucket.file(file_path);
        const image_url = await getDownloadURL(fileRef);
        const image = await fetch(image_url);
        const buffer = await image.arrayBuffer();
        const imageBuffer = Buffer.from(buffer);
        const imageType = image.headers.get('Content-Type') || 'image/png';
        return new Response(imageBuffer, {
            headers: {
                'Content-Type': imageType,
            },
        });
    } catch (error) {
        return new Response('Media not found', { status: 404 });
    }
}