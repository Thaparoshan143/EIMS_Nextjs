// helper/wrapper function collection for mongodb

import { ITransactionInfo } from "@/app/pos/page";
import { cGet, cPost } from "./fetch";

// pass the get request to the /api/pos?lasttid=true to get last transaction id from mongodb


export async function setLastTransId(setter: (tid: number) => void) {
    
    const mongoFetchURL = process.env.NEXT_PUBLIC_POS_FETCH_URL || '';
    const lastFetchURL = mongoFetchURL + "?lasttid=true";

    const res = await cGet(lastFetchURL);

    if (res) {
        // console.log(res['tid']);
        setter(res['tid'] || 0);
    }
}

export async function commitTransToMongoDB(transObj: ITransactionInfo) {

    const mongoFetchURL = process.env.NEXT_PUBLIC_POS_FETCH_URL || '';

    return await cPost(mongoFetchURL, transObj);
}