import nodePgMigrate from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  const pendingMigrations = await nodePgMigrate({
    databaseUrl: process.env.DATABASE_URL,
    dir: join("infra", "migrations"),
    migrationsTable: "pgmigrations",
    direction: "up",
    dryRun: true,
    verbose: true,
  });

  response.send({
    pendingMigrations,
  });
}
