import { Client } from "pg";

async function query(queryObject) {
  const client = new Client({
    host: host,
    port: port,
    user: user,
    password: password,
  });
  await client.connect();
  const result = await client.query(queryObject);
  await client.end();

  return result;
}

export default {
  query: query,
};
