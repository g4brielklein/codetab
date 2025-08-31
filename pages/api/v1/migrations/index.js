import { createRouter } from "next-connect";
import nodePgMigrate from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database.js";
import { InternalServerError } from "infra/errors";

const router = createRouter();

router.get(migrations).post(migrations);

export default router.handler({
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandler,
});

function onNoMatchHandler(request, response) {
  const method = request.method;

  if (method !== "POST" && method !== "GET") {
    return response
      .status(405)
      .send({ ERROR: `Method ${method} is not allowed on this endpoint` });
  }
}

function onErrorHandler(err, request, response) {
  const error = new InternalServerError({
    cause: err,
  });

  response.status(error.statusCode).json(error);
}

async function migrations(request, response) {
  let status = 200;
  let dbClient = null;

  try {
    dbClient = await database.getConnectedClient();

    const defaultMigrationOptions = {
      dbClient,
      dir: resolve("infra", "migrations"),
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
  } finally {
    await database.endClientConnection(dbClient); // close pg-migrate client connection
  }
}
