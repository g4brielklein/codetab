import { createRouter } from "next-connect";
import database from "infra/database.js";
import { InternalServerError, MethodNotAllowedError } from "infra/errors.js";

const router = createRouter();

router.get(getHandler);

export default router.handler({
  onNoMatch: onNoMatchHandler,
  onError: onErrorHandler,
});

function onNoMatchHandler(request, response) {
  const method = request.method;

  const error = new MethodNotAllowedError({
    method,
    endpoint: "/status",
    allowedMethods: ["GET"],
  });

  response.status(error.statusCode).json(error);
}

function onErrorHandler(err, request, response) {
  const error = new InternalServerError({
    cause: err,
  });

  console.error(error);
  response.status(error.statusCode).json(error);
}

async function getHandler(request, response) {
  const updatedAt = new Date().toISOString();

  const currentConnections = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname = $1;",
    values: [process.env.POSTGRES_DB],
  });

  const maxConnections = await database.query("SHOW max_connections;");

  const postgresVersion = await database.query("SHOW server_version;");

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: parseInt(maxConnections.rows[0].max_connections),
        opened_connections: currentConnections.rows[0].count,
        version: postgresVersion.rows[0].server_version,
      },
    },
  });
}
