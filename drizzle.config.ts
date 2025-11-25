import type { Config } from 'drizzle-kit';

export default {
  schema: './src/app/models/*',
  out: './drizzle',
  dialect: 'sqlite',
  dbCredentials: {
    url: './sqlite.db',
  },
} satisfies Config;
