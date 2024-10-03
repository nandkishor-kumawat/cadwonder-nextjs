import { bucket } from '@/firebase';
import { getDownloadURL } from 'firebase-admin/storage'
import { NextResponse } from 'next/server';
import crypto from 'crypto'
import { getAuth } from '@/lib/auth';

export async function POST(request: Request) {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const { user } = await getAuth();

    if (!user || user.role !== 'ADMIN') {
        return NextResponse.json({ error: 'You are not Authorized to upload' }, { status: 401 });
    }

    if (!file) {
        return NextResponse.json({ error: 'File is required' }, { status: 400 });
    }

    const fileName = `${crypto.randomUUID()}.${file.name.split('.').pop()}`;
    const fileBuffer = Buffer.from(await file.arrayBuffer());


    try {
        const fileRef = bucket.file(fileName);
        const blobStream = fileRef.createWriteStream({
            metadata: {
                contentType: file.type,
            },
        });

        blobStream.end(fileBuffer);

        await new Promise<void>((resolve, reject) => {
            blobStream.on('finish', resolve);
            blobStream.on('error', reject);
        });

        const fileUrl = await getDownloadURL(fileRef)

        const fileInfo = {
            name: fileRef.name,
            size: file.size,
            url: fileUrl,
            type: file.type,
        }

        return NextResponse.json(fileInfo, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
