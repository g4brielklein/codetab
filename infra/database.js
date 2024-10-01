import { Client } from "pg";

const clientOptions = {
  host: process.env.POSTGRES_HOST,
  port: process.env.POSTGRES_PORT,
  user: process.env.POSTGRES_USER,
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  ssl: getSSLConfigs(),
};

async function query(queryObject) {
  let client = {};

  try {
    client = await getConnectedClient(clientOptions);
    return await client.query(queryObject);
  } catch (err) {
    console.error(err);
    throw err;
  } finally {
    await endClientConnection(client);
  }
}

async function getConnectedClient() {
  const client = new Client(clientOptions);

  try {
    await client.connect();
    return client;
  } catch (err) {
    await endClientConnection(client);
    throw err;
  }
}

async function endClientConnection(client) {
  await client.end();
}

function getSSLConfigs() {
  if (process.env.POSTGRES_CA) {
    return {
      ca: process.env.POSTGRES_CA,
    };
  }

  return process.env.NODE_ENV !== "development";
}

const database = {
  query,
  getConnectedClient,
  endClientConnection,
};

export default database;
