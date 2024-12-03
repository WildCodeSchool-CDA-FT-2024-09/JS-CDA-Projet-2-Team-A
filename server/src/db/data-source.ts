import { DataSource, DataSourceOptions } from "typeorm";
import "dotenv/config";
import {
  Product,
  Supplier,
  Employee,
  Role,
  User,
  Message,
  Order,
  OrderProduct,
  Example,
} from "../entities/index";

const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, ENV } =
  process.env;

const sync = ENV === "dev";

const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: POSTGRES_HOST,
  port: 5432,
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities: [
    Product,
    Supplier,
    Employee,
    Role,
    User,
    Message,
    Order,
    OrderProduct,
    Example,
  ],
  synchronize: sync,
  logging: false, // Changer à true pour avoir des logs avancés de typeorm en cas d'erreurs.
};

export const AppDataSource = new DataSource(dataSourceOptions);
