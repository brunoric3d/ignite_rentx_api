import dotenv from "dotenv";

dotenv.config();

export = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: "rentx",
  migrations: ["./src/database/migrations/*.ts"],
  entities: ["./src/modules/**/entities/*.ts"],
  autoLoadEntities: true,
  cli: {
    migrationsDir: "./src/database/migrations",
  },
};
