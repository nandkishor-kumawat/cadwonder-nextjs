import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { User } from "./types/types";


export const getData = async ({ coll, key, value }: { coll: string, key: string, value: string }) => {
    if(!coll || !key || !value) return []
    const q = query(collection(db, coll), where(key, "==", value));

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

export const getDataFromCollection = async (Collection:string) => {
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

export const getRegex = (search: string) => {
    const searchWords = search.trim().split(/\s+/).map(word => `(?=.*${word})`).join('|');
    const regexPattern = `^(?=.*${searchWords}).*`;
    const regex = new RegExp(regexPattern, 'i');
    return regex;
}


export const createSlug = (text:string) => {
    const slug = text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return slug + '-' + Date.now().toString().slice(-2);
}