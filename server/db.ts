import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "pg";
import * as schema from "@shared/schema";

const { Pool } = postgres;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const db = drizzle(pool, { schema });
