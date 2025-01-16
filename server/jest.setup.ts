import { beforeAll, afterAll } from "@jest/globals";
import { AppDataSource } from "./src/db/data-source";
import seed from "./src/db/seed-test";

beforeAll(async () => {
  try {
    await AppDataSource.initialize();
    await seed();
    console.info("in-memory SQLite DB is seeded");
  } catch (error) {
    console.error("Error during database initialization or seeding:", error);
    throw error;
  }
});

afterAll(async () => {
  try {
    await AppDataSource.destroy();
  } catch (error) {
    console.error("Error during database cleanup:", error);
    throw error;
  }
});
