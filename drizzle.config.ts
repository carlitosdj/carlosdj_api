import { Config } from "drizzle-kit";
 
export default {
  schema: "./src/_schemas/schema.ts",
  out: "./src/_schemas/",
  dbCredentials: {
    connectionString: "mysql://wwinst_carlitos:carlosdj123@ftp.institutodefelicibus.com.br:3306/wwinst_nestjs",
  },
  driver: "mysql2"

} satisfies Config;