import { db } from "@/firebase";
import { getRegex } from "@/lib/functions";
import { Model } from "@/lib/types/types";
import { collection, getDocs, orderBy, query as que } from "firebase/firestore";

export const GET = async (request: Request) => {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');


    const q = que(collection(db, 'models'), orderBy('createdAt', 'desc'));
    const models = [] as Model[];

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        models.push({ id: doc.id, ...doc.data() } as Model);
    });

    // await new Promise(resolve => setTimeout(resolve, 5000))

    if (!query) {
        return new Response(JSON.stringify(models), { status: 200 })
    }

    const regex = getRegex(query);
    const filteredModels = models?.filter(model => {
        return regex.test(model.modelName);
    });

    return new Response(JSON.stringify(filteredModels), { status: 200 })

}