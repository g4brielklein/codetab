import orchestrator from 'tests/orchestrator.js'

beforeAll(async () => {
  await orchestrator.waitForAllServices()
})

test("GET to /api/vi/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();

  expect(response.status).toBe(200);
  expect(responseBody.updated_at).toBeDefined();
  expect(responseBody.updated_at).toEqual(parsedUpdatedAt);
});

test("Status info should be returned and valid from status page", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  const { max_connections, opened_connections, version } =
    responseBody.dependencies.database;

  expect(max_connections).toBeDefined();
  expect(max_connections).toBeGreaterThan(0);

  expect(opened_connections).toBeDefined();
  expect(opened_connections).toBe(1);

  expect(version).toBeDefined();
  expect(parseInt(version)).toBeGreaterThan(0);
});
