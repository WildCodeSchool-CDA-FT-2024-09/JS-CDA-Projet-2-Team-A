import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";
import { Example } from "../entities/index";

const { SQLITE_FILE } = process.env;

const dataSourceOptions: DataSourceOptions = {
  type: "sqlite",
  database: SQLITE_FILE as string,
  entities: [Example],
  synchronize: true,
  logging: false, // Changer à true pour avoir des logs avancés de typeorm en cas d'erreurs.
};

export const AppDataSource = new DataSource(dataSourceOptions);
