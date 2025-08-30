import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("POST /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Making a post request", async () => {
      const response = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
      });

      const responseJson = await response.json();

      console.log(responseJson);

      expect(responseJson).toEqual({
        name: "MethodNotAllowedError",
        message: "Method POST not allowed on endpoint /status",
        action: "Use one of the allowed methods for this endpoint: [GET]",
        status_code: 405,
      });
    });
  });
});
