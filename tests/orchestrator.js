import retry from "async-retry";
import database from "infra/database";

async function waitForAllServices() {
  await waitForWebServer();

  async function waitForWebServer() {
    return retry(fetchStatusPage, {
      retries: 100,
      maxTimeout: 1000,
    });

    async function fetchStatusPage() {
      const res = await fetch("http://localhost:3000/api/v1/status");

      if (res.status !== 200) {
        throw Error();
      }
    }
  }
}

async function cleanDB() {
  await database.query(`
    DROP SCHEMA public cascade; CREATE SCHEMA public;
  `);
}

const orchestrator = {
  waitForAllServices,
  cleanDB,
};

export default orchestrator;
