import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";

const url = process.env["DATABASE_URL"];
if (!url) throw new Error("DATABASE_URL is required");

export const db = drizzle(new Pool({ connectionString: url }), {
  schema,
  casing: "snake_case",
});
