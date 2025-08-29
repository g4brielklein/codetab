import database from "infra/database.js";
import { InternalServerError } from "infra/errors.js";

async function status(request, response) {
  const method = request.method;

  if (method !== "GET") {
    return response
      .status(405)
      .send({ ERROR: `Method ${method} is not allowed on this endpoint` });
  }

  try {
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
  } catch (err) {
    const error = new InternalServerError({
      cause: err,
    });

    console.error(error);
    response.status(error.statusCode).json(error);
  }
}

export default status;
