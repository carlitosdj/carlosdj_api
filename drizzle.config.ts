import { Config } from "drizzle-kit";
 
export default {
  schema: "./src/_schemas/schema.ts",
  out: "./src/_schemas/",
  dbCredentials: {
    connectionString: "mysql://carlosdj_adm:carlitosJamaica@89.116.186.124:3306/carlosdj_ead_project",
    //connectionString: "mysql://root:pass@0.0.0.0:3306/carlos_database",
  },
  driver: "mysql2"

} satisfies Config;