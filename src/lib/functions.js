import { db } from "@/firebase";
import { collection, doc, getDoc, getDocs, onSnapshot, query, where } from "firebase/firestore";



export const getData = async ({ coll, key, value }) => {
    const q = query(collection(db, coll), where(key, "==", value));

    const data = []

    const querySnapshot = await getDocs(q);


    querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() })
    });

    return data
}

export const getUsers = async () => {
    const q = query(collection(db, "users"));
    const users = []
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() })
    });
    return users
}


export const getFollowers = (user_id, callback, type = "following") => {
    const q = query(collection(db, "followers"), where(type, "==", user_id));

    const unsubscribe = onSnapshot(q, (snapshot) => {
        let d = []
        snapshot.forEach((doc) => {
            d.push({ id: doc.id, ...doc.data() })
        })
        callback(d)

    });
    return () => unsubscribe()
}


export const getUser = async id => {
    const user = await getDoc(doc(db, "users", id))
    if (!user.exists()) return null;
    return { id: user.id, ...user.data() }
}

export const getRegex = (search) => {
    const searchWords = search.trim().split(/\s+/).map(word => `(?=.*${word})`).join('|');
    const regexPattern = `^(?=.*${searchWords}).*`;
    const regex = new RegExp(regexPattern, 'i');
    return regex;
}


export const createSlug = (text) => {
    const slug = text
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');

    return slug + '-' + Date.now().toString().slice(-2);
}