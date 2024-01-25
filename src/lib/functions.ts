import { db } from "@/firebase";
import { OrderByDirection, collection, doc, getDoc, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { User } from "./types/types";


export const getData = async ({ coll, key, value, order }: { coll: string, key: string, value: string, order?: OrderByDirection }) => {
    if (!coll || !key || !value) return []
    let q = query(collection(db, coll), where(key, "==", value));
    if (order) q = query(collection(db, coll), where(key, "==", value), orderBy("createdAt", order));

    const data = [] as any[]

    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() })
    });

    return data
}

export const getUsers = async () => {
    const q = query(collection(db, "users"));
    const users = [] as any[]
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() })
    });
    return users
}


export const getDataFromCollection = async (Collection: string) => {
    const q = query(collection(db, Collection));
    const d = [] as any[]
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        d.push({ id: doc.id, ...doc.data() })
    });
    return d;
}


export const getFollowers = (user_id: string, callback: (data: any) => void, type = "following") => {
    const q = query(collection(db, "followers"), where(type, "==", user_id));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        let d = [] as any[]
        snapshot.forEach((doc) => {
            d.push({ id: doc.id, ...doc.data() })
        })
        callback(d)

    });
    return () => unsubscribe()
}


export const getUser = async (id: string) => {
    if (!id) return null;
    const user = await getDoc(doc(db, "users", id));
    if (!user.exists()) return null;
    return { id: user.id, ...user.data() } as User;
}


export const getUserBy = async (key: string, value: string) => {
    if (!value || !key) return null;
    let q = query(collection(db, "users"), where(key, "==", value));
    const querySnapshot = await getDocs(q);
    const users = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as User[];
    return users[0];
}

export const getRegex = (search: string) => {
    const searchWords = search.trim().split(/\s+/).map(word => `(?=.*${word})`).join('|');
    const regexPattern = `^(?=.*${searchWords}).*`;
    const regex = new RegExp(regexPattern, 'i');
    return regex;
}


export const createSlug = async (Collection: string, field: string, text: string): Promise<string> => {
    const slug = text.split(' ').slice(0,12).join(' ')
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

    const data = await getData({ coll: Collection, key: field, value: slug });
    if (data.length === 0) return slug;

    const data2 = await getDataFromCollection(Collection);
    const count = data2.length;
    return `${slug}-${count}`;
}
