// some helper function here..

import pool from "./dbutil";

/**
 * Wrapper function to get the last record id 
 * args: tablename, idField (opt, what is the idfield identifier, default to id)
 * return: last id in table record
 */
export const getRecords = async (tableName: string, cond?: string) => {
    const client = await pool.connect();
    const records = (await client.query(`SELECT * FROM ${tableName} ${cond};`)).rows;
    client.release();

    return records;
}

/**
 * Wrapper function to get the last record id 
 * args: tablename, idField (opt, what is the idfield identifier, default to id)
 * return: last id in table record
 */
export const getLastRecordId = async (tableName: string, idField: string = 'id') => {
    const client = await pool.connect();
    const queryCmd = await client.query(`SELECT * FROM ${tableName} ORDER BY ${idField} DESC LIMIT 1;`);
    const lastId = queryCmd.rowCount != 0 ? queryCmd.rows[0][idField] : 0;
    client.release();
    
    return lastId;
}

function getValuesPlaceholder(num: number) {
    let tempPlace: string[] = [];
    Array(num).fill(0).map((_, ind) => {
        tempPlace.push(`$${ind+1}`)
    });
    return tempPlace.join(", ");
}

/**
 * ## Object args version
 * Wrapper function to get the last record id 
 * args: tablename, record (object with values field to be inserted into table.., #note: include id version)
 * return: new updated records (i.e after insert, fresh select query..)
 */
export const insertRecord = async (tableName: string, record: Object) => {
    const client = await pool.connect();
    const eles = Object.values(record);
    const placeholderSQL = getValuesPlaceholder(eles.length);

    await client.query(`INSERT INTO ${tableName} VALUES (${placeholderSQL});`, eles);
    const res = await client.query(` SELECT * FROM ${tableName};`);
    client.release();

    return res.rows;
}


/**
 * Wraper function only ment to be used once.. i.e during table creation
 * args: tableName, schema (table schema defined in string)
 * usage: replaced as: CREATE TABLE IF NOT EXISTS ${tableName} (
 *                      ${schema}
 *                      )
 * return: status/query result
 */
export async function firstTableConstruct(tableName: string, schema: string) {
    const client = await pool.connect();
    const res = await client.query(`CREATE TABLE IF NOT EXISTS ${tableName} (${schema})`);
    return res;
}