import nodePgMigrate from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  const method = request.method;

  const pendingMigrations = await nodePgMigrate({
    databaseUrl: process.env.DATABASE_URL,
    dir: join("infra", "migrations"),
    migrationsTable: "pgmigrations",
    direction: "up",
    dryRun: method === "POST" ? false : true,
    verbose: true,
  });

  response.send({
    pendingMigrations: pendingMigrations.map(
      (pendingMigration) => pendingMigration.name,
    ),
  });
}
