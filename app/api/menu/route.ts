import { deleteRecord, firstTableConstruct, getLastRecordId, getRecords, insertRecord, updateRecord, updateRecordM } from '@/lib/utils/dbquery';
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

export async function PUT(req: NextRequest) {
    try {
        const reqId = await req.nextUrl.searchParams.get('id');
        const multipleItem = (await req.nextUrl.searchParams.get('multiple')) === "true"; // this is the case of multiple item put update, used in pos..  
        // console.log("update the id: " + reqId);

        if (!reqId && !multipleItem) {
            return NextResponse.json({message: "error: id param missing!"}, { status : 404 });
        }
        else {
            const reqEles = await req.json();

            if (multipleItem) {
                
                console.log("Multiple update recieved");
                // return null;
                const updatedRec = await updateRecordM('menu', reqEles);

                return NextResponse.json(updatedRec, { status: 200 });
            }

            const updatedRec = await updateRecord('menu', reqEles, Number(reqId));
            
            return NextResponse.json(updatedRec, { status: 200 });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json(error, { status: 404 });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const reqId = await req.nextUrl.searchParams.get('id');
        console.log("delete request id is: " + reqId);

        if (!reqId) {
            return NextResponse.json({message: "error: id param missing!"}, { status : 404 });
        }
        else {
            const updatedRec = await deleteRecord('menu', Number(reqId));
    
            return NextResponse.json(updatedRec, { status: 200 });
        }

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
                imgpath VARCHAR(500),
                price DECIMAL(10, 2) CHECK(price > 0),
                quantity INT CHECK(quantity >= 0)
                `)
}
