import nodePgMigrate from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  let pendingMigrations = [];
  const method = request.method;

  if (method === "GET") {
    pendingMigrations = await nodePgMigrate({
      databaseUrl: process.env.DATABASE_URL,
      dir: join("infra", "migrations"),
      migrationsTable: "pgmigrations",
      direction: "up",
      dryRun: true,
      verbose: true,
    });
  } else if (method === "POST") {
    pendingMigrations = await nodePgMigrate({
      databaseUrl: process.env.DATABASE_URL,
      dir: join("infra", "migrations"),
      migrationsTable: "pgmigrations",
      direction: "up",
      dryRun: false,
      verbose: true,
    });
  }

  response.send({
    pendingMigrations,
  });
}
