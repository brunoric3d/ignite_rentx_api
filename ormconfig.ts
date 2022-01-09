import dotenv from "dotenv";

dotenv.config();
dotenv.config({ path: "./_database.env" });

export = {
  type: "postgres",
  host: process.env.POSTGRES_DB_URL,
  port: process.env.POSTGRES_DB_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  migrations: ["./src/database/migrations/*.ts"],
  entities: ["./src/modules/**/entities/*.ts"],
  autoLoadEntities: true,
  cli: {
    migrationsDir: "./src/database/migrations",
  },
};
