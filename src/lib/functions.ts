import { createWorker } from "tesseract.js";

export const getRegex = (search: string) => {
    const searchWords = search.trim().split(/\s+/).map(word => `(?=.*${word})`).join('|');
    const regexPattern = `^(?=.*${searchWords}).*`;
    const regex = new RegExp(regexPattern, 'i');
    return regex;
}

export const createSlug = async (Collection: string, field: string, text: string): Promise<string> => {
    const slug = text.split(' ').slice(0, 12).join(' ')
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return slug;
}

export const updateViewCount = async (id: string) => {
    if (process.env.NODE_ENV === "development") return
    if (!id) return

}


export const extractText = async (file: Tesseract.ImageLike) => {
    return new Promise<string>(async (resolve, reject) => {
        const worker = await createWorker("eng", 1, { cachePath: "." });
        const { data: { text } } = await worker.recognize(file, {
            rotateAuto: true,
        });
        resolve(text);
        await worker.terminate();
    })
}


export function getBlurLevel(image: HTMLImageElement) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = image.width;
    canvas.height = image.height;
    ctx!.drawImage(image, 0, 0, image.width, image.height);

    const imageData = ctx!.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const width = imageData.width;
    const height = imageData.height;

    let sum = 0;
    let count = 0;

    for (let y = 1; y < height - 1; y++) {
        for (let x = 1; x < width - 1; x++) {
            const i = (y * width + x) * 4;

            // Apply Laplacian operator
            const laplacian = -4 * data[i] +
                data[(y * width + (x - 1)) * 4] + // left
                data[(y * width + (x + 1)) * 4] + // right
                data[((y - 1) * width + x) * 4] + // top
                data[((y + 1) * width + x) * 4];  // bottom

            // Sum the absolute values of the Laplacian
            sum += Math.abs(laplacian);
            count++;
        }
    }

    // Calculate the average value (as the blur level)
    const averageLaplacian = sum / count;

    return averageLaplacian;
}