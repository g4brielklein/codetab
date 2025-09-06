import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.cleanDB();
});

describe("PUT /api/v1/migrations", () => {
  describe("Anonymous user", () => {
    test("Running pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/v1/migrations", {
        method: "PUT",
      });

      const responseJson = await response.json();

      expect(responseJson).toEqual({
        name: "MethodNotAllowedError",
        message: "Method PUT not allowed on endpoint /api/v1/migrations",
        action: "Use one of the allowed methods for this endpoint",
        status_code: 405,
      });
    });
  });
});
