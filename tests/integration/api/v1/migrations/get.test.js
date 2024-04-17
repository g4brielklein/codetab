import database from "infra/database";

async function cleanDB() {
  await database.query(`
    DROP SCHEMA public; CREATE SCHEMA public;
  `);
}

test("Should run migrations on dry run", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");
  expect(response.status).toBe(200);

  await cleanDB();

  const responseBody = await response.json();
  expect(Array.isArray(responseBody.pendingMigrations)).toBe(true);
  expect(responseBody.pendingMigrations.length).toBeGreaterThan(0);
});
