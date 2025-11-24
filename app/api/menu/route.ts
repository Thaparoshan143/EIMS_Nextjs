import { firstTableConstruct, getLastRecordId, getRecords, insertRecord } from '@/lib/utils/dbquery';
import { NextRequest, NextResponse } from 'next/server';
 
export async function GET(req: NextRequest) {

    try {
        // only call for table creation
        // createTable();

        // please ensure that the menu table exists in the database... before select query..
        const records = await getRecords('menu');

        return NextResponse.json(records, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(error, { status: 404 });
    }
}

export async function POST(req: NextRequest) {
    try {
        const reqEles = await req.json();
        const prevId = await getLastRecordId('menu', 'id');
        const updatedRec = await insertRecord('menu', {id: prevId+1, ...reqEles});

        return NextResponse.json(updatedRec, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json(error, { status: 404 });
    }
}

const createTable = () => {
    // only call once for new table cration below codes..
    firstTableConstruct('menu', `
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                imgPath VARCHAR(500),
                price DECIMAL(10, 2) CHECK(price > 0),
                quantity INT CHECK(quantity > 0)
                `)
}
