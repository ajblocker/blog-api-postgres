import { Pool } from 'pg';

//create pool object for postgres connection
const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export default pool;
