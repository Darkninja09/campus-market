import { drizzle } from 'drizzle-orm/better-sqlite';
import Database from 'better-sqlite3';
import * as schema from '../models/schema';

export const db = drizzle(new Database('sqlite.db'), { schema });
