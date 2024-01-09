import { Config } from "drizzle-kit";
 
export default {
  schema: "./src/_schemas/schema.ts",
  out: "./src/_schemas/",
  dbCredentials: {
    connectionString: "mysql://carlos_admin:carlosdj123@ftp.carlosdj.com.br:3306/carlos_database",
  },
  driver: "mysql2"

} satisfies Config;