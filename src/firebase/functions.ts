import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import { storage } from ".";

export const uploadFiles = async (files: File[]) => {
    const fileDetails = [];
    for (const file of files) {
        const { name } = file;
        const storageRef = ref(storage, `models/${name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        fileDetails.push({ name, url });
    }
    return fileDetails;
}

export const uploadFileWithProgress = async (file: File, index: number, onProgress: (progressIndex: number, progress: number) => void) => {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `files/files/${file.name}-${Date.now()}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                onProgress(index, progress);
            },
            (error) => {
                reject(error);
            },
            async () => {
                try {
                    const url = await getDownloadURL(uploadTask.snapshot.ref);
                    resolve({ name: file.name, url });
                } catch (error) {
                    reject(error);
                }
            }
        );
    });
};

export const uploadFile = async (file: File | Blob, filename: string) => {
    const storageRef = ref(storage, `files/${filename}`);
    const snapshot = await uploadBytes(storageRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return { name: filename, url };
}