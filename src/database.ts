import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();
"SET ENV=dev"

const {
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_TEST_DB,
    ENV,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env;

let postgresDB = POSTGRES_DB;
if (ENV === "test") {
    postgresDB = POSTGRES_TEST_DB;
}

const client = new Pool({
    host: POSTGRES_HOST,
    database: postgresDB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
});

export default client;
