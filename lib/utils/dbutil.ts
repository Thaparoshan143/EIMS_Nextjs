import { Pool } from 'pg';

const pool = new Pool({
    connectionString: process.env.NEXT_PUBLIC_DB_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

export default pool;