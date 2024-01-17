import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const currentConnections = await database.query(
    "SELECT sum(numbackends) AS total FROM pg_stat_database;",
  );

  const maxConnections = await database.query(
    "SELECT * FROM pg_settings WHERE name = 'max_connections';",
  );

  const postgresVersion = await database.query(
    "SELECT split_part(version(), ' ', 2) AS version",
  );

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        max_connections: parseInt(maxConnections.rows[0].setting),
        opened_connections: parseInt(currentConnections.rows[0].total),
        version: postgresVersion.rows[0].version,
      },
    },
  });
}

export default status;
