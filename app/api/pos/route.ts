import { NextRequest, NextResponse } from "next/server";
import { MongoClient } from "mongodb";


export async function GET(req: NextRequest) {
    
    const client = getMongoClient();

    try {

        // console.log("Get request recieved");

        await client.connect();
        const collection = getMongoDBColl(client);

        // the field is hardcoded for now...
        const lasttidSearch = (await req.nextUrl.searchParams.get('lasttid')) === "true";
        if (lasttidSearch) {
            const lastTrans = await collection.find().sort({ 'tid': -1 }).limit(1).toArray();
            // const lastTransId = await lastTrans['tid'];
            const lastTransId = await lastTrans[0]['tid'];
            // console.log(lastTransId);
            return NextResponse.json({ tid: lastTransId }, { status: 200 });
        }

        const allTrans = await collection.find({}).toArray();

        return NextResponse.json(allTrans, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json(error, { status: 404 });
    } finally {
        await client.close();
    }
}

export async function POST(req: NextRequest) {

    const client = getMongoClient();

    try {

        // console.log("Post request recieved");
        const data = await req.json();
        await client.connect();

        const collection = getMongoDBColl(client);
        const updated = await collection.insertOne(data);

        return NextResponse.json(updated, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json(error, { status: 404 });
    } finally {
        await client.close();
    }
}

// for POS PUT & DELETE method are not implemented..


// helper functions
const _defDBName = "eims-trans";
const _defDBColl = "eims-coll";

export function getMongoClient() {
    const mongodbURI = process.env.NEXT_PUBLIC_MONGODB_URI || '';
    return new MongoClient(mongodbURI);
}

export function getMongoDBColl(client: MongoClient, dbName: string = _defDBName, dbColl: string = _defDBColl) {

    const db = client.db(dbName);
    return db.collection(dbColl);
}