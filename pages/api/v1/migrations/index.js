import nodePgMigrate from "node-pg-migrate";
import { join } from "node:path";

export default async function migrations(request, response) {
  const method = request.method;
  let status = 200;

  if (method !== "POST" && method !== "GET") {
    return response
      .status(403)
      .send({ ERROR: `Method ${method} not allowed on this endpoint` });
  }

  const defaultMigrationOptions = {
    databaseUrl: process.env.DATABASE_URL,
    dir: join("infra", "migrations"),
    migrationsTable: "pgmigrations",
    direction: "up",
    dryRun: true,
    verbose: true,
  };

  if (method === "POST") {
    const runnedMigrations = await nodePgMigrate({
      ...defaultMigrationOptions,
      dryRun: false,
    });

    status = runnedMigrations.length >= 1 ? (status = 201) : status;

    return response.status(status).send({
      runnedMigrations: runnedMigrations.map(
        (runnedMigration) => runnedMigration.name,
      ),
    });
  }

  const pendingMigrations = await nodePgMigrate(defaultMigrationOptions);

  return response.status(status).send({
    pendingMigrations: pendingMigrations.map(
      (pendingMigration) => pendingMigration.name,
    ),
  });
}
