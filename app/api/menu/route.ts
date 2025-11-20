import pool from '@/lib/utils/dbutil';
import { NextRequest, NextResponse } from 'next/server';
 
export async function GET(req: NextRequest) {

    try {
        // please ensure that the menu table exists in the database... before select query..
        const client = await pool.connect();
        const result = await client.query("SELECT * FROM menu;");
        client.release();
        
        return NextResponse.json(result.rows, { status: 200 });
    } catch (error) {
        console.error("Either pool is unreachable or other get req. error")
        return NextResponse.json(error, { status: 404 });
    }
}