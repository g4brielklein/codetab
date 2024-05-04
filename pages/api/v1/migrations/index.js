import nodePgMigrate from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

export default async function migrations(request, response) {
  const method = request.method;
  let status = 200;
  let dbClient = null;

  if (method !== "POST" && method !== "GET") {
    return response
      .status(405)
      .send({ ERROR: `Method ${method} is not allowed on this endpoint` });
  }

  try {
    dbClient = await database.getConnectedClient();

    const defaultMigrationOptions = {
      dbClient,
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
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await database.endClientConnection(dbClient); // close pg-migrate client connection
  }
}
