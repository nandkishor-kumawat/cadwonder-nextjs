
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