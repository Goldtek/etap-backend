import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

pool.connect((err) => {
    if (err) {
        console.error('Error connecting to PostgreSQL:->', err.stack);
    } else {
        console.log('Connected to PostgreSQL successfully!');
    }
});

export default pool;