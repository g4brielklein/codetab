import database from "infra/database";

beforeAll(cleanDB);

async function cleanDB() {
  await database.query(`
    DROP SCHEMA public cascade; CREATE SCHEMA public;
  `);

  console.log("Database cleaned for tests");
}

test("Should run migrations on live run", async () => {
  const responseFirstPost = await fetch(
    "http://localhost:3000/api/v1/migrations",
    {
      method: "POST",
    },
  );

  const responseFirstPostJson = await responseFirstPost.json();
  expect(responseFirstPostJson.pendingMigrations.length).toBeGreaterThan(0);

  const responseSecondPost = await fetch(
    "http://localhost:3000/api/v1/migrations",
    {
      method: "POST",
    },
  );

  const responseSecondPostJson = await responseSecondPost.json();
  expect(responseSecondPostJson.pendingMigrations.length).toBe(0);
});
