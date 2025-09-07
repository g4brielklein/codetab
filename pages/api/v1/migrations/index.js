import { createRouter } from "next-connect";
import nodePgMigrate from "node-pg-migrate";
import { resolve } from "node:path";
import database from "infra/database.js";
import controller from "infra/controller.js";

const defaultMigrationOptions = {
  dbClient: null,
  dir: resolve("infra", "migrations"),
  migrationsTable: "pgmigrations",
  direction: "up",
  dryRun: true,
  verbose: true,
};

const router = createRouter();

router.get(getHandler);
router.post(postHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  let dbClient = null;

  try {
    dbClient = await database.getConnectedClient();

    const pendingMigrations = await nodePgMigrate({
      ...defaultMigrationOptions,
      dbClient,
    });

    return response.status(200).send({
      pendingMigrations: pendingMigrations.map(
        (pendingMigration) => pendingMigration.name,
      ),
    });
  } finally {
    await database.endClientConnection(dbClient); // close pg-migrate client connection
  }
}

async function postHandler(request, response) {
  let dbClient = null;
  let status = 200;

  try {
    dbClient = await database.getConnectedClient();

    const runnedMigrations = await nodePgMigrate({
      ...defaultMigrationOptions,
      dbClient,
      dryRun: false,
    });

    status = runnedMigrations.length >= 1 ? (status = 201) : status;

    return response.status(status).send({
      runnedMigrations: runnedMigrations.map(
        (runnedMigration) => runnedMigration.name,
      ),
    });
  } finally {
    await database.endClientConnection(dbClient); // close pg-migrate client connection
  }
}
