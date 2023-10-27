import database from "../../../../infra/database.js";

async function status(request, response) {
  const result = await database.query("SELECT 'Database is up!' AS message");

  console.log(result.rows[0]);

  response.status(200).json({
    apiResponse: "API is up!",
    databaseResponse: result.rows[0],
  });
}

export default status;
