import type { Config } from "drizzle-kit";

// const localConfig = {
//   schema: "./db/schema/*",
//   out: "./drizzle",
//   driver: "better-sqlite",
//   dbCredentials: {
//     url: process.env.DB_URL!,
//   },
// } satisfies Config;


// from: https://github.com/drizzle-team/drizzle-orm/discussions/1545
const localConfig = {
    schema: './src/db/schema/*',
    out: './drizzle',
    driver: 'better-sqlite',
    dbCredentials: {
        url: process.env.LOCAL_DB_PATH!
    }
} satisfies Config

const remoteConfig = {
    schema: './db/schema/*',
    out: './drizzle',
    driver: 'd1',
    dbCredentials: {
        wranglerConfigPath: 'wrangler.toml',
        dbName: 'NAME'
    }
} satisfies Config
export default localConfig;
// export default process.env.NODE_ENV === "production" ? cloudflareConfig : localConfig;
// export default process.env.LOCAL_DB_PATH ? localConfig : remoteConfig;