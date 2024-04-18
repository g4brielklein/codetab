import database from "infra/database";

beforeAll(cleanDB);

async function cleanDB() {
  await database.query(`
    DROP SCHEMA public cascade; CREATE SCHEMA public;
  `);

  console.log("Database cleaned for tests");
}

test("Should run migrations on live run", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response.status).toBe(200);

  const getResponse = await fetch("http://localhost:3000/api/v1/migrations");
  const getResponseJson = await getResponse.json();
  expect(getResponseJson.pendingMigrations.length).toBe(0);
});
