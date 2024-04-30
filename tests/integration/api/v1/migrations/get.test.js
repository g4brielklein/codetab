import database from "infra/database";

beforeAll(cleanDB);

async function cleanDB() {
  await database.query(`
    DROP SCHEMA public cascade; CREATE SCHEMA public;
  `);

  console.log("Database cleaned for tests");
}

test("Should run migrations on dry run", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody.pendingMigrations)).toBe(true);
  expect(response.status).toBe(200);
  expect(responseBody.pendingMigrations.length).toBeGreaterThan(0);
});
