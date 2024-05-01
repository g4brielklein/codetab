import nodePgMigrate from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const method = request.method;
  let status = 200;

  if (method !== "POST" && method !== "GET") {
    return response
      .status(405)
      .send({ ERROR: `Method ${method} is not allowed on this endpoint` });
  }

  const defaultMigrationOptions = {
    dbClient: await database.getConnectedClient(),
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
    await database.endClientConnection(defaultMigrationOptions.dbClient); // close pg-migrate client connection

    status = runnedMigrations.length >= 1 ? (status = 201) : status;

    return response.status(status).send({
      runnedMigrations: runnedMigrations.map(
        (runnedMigration) => runnedMigration.name,
      ),
    });
  }

  const pendingMigrations = await nodePgMigrate(defaultMigrationOptions);
  await database.endClientConnection(defaultMigrationOptions.dbClient); // close pg-migrate client connection

  return response.status(status).send({
    pendingMigrations: pendingMigrations.map(
      (pendingMigration) => pendingMigration.name,
    ),
  });
}
