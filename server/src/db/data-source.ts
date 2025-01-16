import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";
import { entities } from "../entities/index";

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  ENV,
  NODE_ENV,
} = process.env;

const sync = ENV === "dev";

const dataSourceOptions: DataSourceOptions =
  NODE_ENV === "test"
    ? {
        type: "sqlite",
        database: ":memory:",
        entities: entities,
        synchronize: true,
      }
    : {
        type: "postgres",
        host: POSTGRES_HOST,
        port: 5432,
        username: POSTGRES_USER,
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
        entities: entities,
        synchronize: sync,
        logging: false, // Changer à true pour avoir des logs avancés de typeorm en cas d'erreurs.
      };

export const AppDataSource = new DataSource(dataSourceOptions);
