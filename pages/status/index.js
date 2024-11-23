import useSWR from "swr";

function Status() {
  const { data, error, isLoading } = useSWR("/api/v1/status", fetcher, {
    refreshInterval: 2000,
  });

  async function fetcher(key) {
    const response = await fetch(key);
    return response.json();
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (isLoading) {
    return <h2>Loading data...</h2>;
  }

  return (
    <div>
      <div>
        <h1>Status page</h1>

        <div>
          <h2>Database status</h2>

          <div>
            <p>Max connections:</p>
            <span>{data.dependencies.database.max_connections}</span>
          </div>

          <div>
            <p>Opened connections:</p>
            <span>{data.dependencies.database.opened_connections}</span>
          </div>

          <div>
            <p>Postgres Version</p>
            <span>{data.dependencies.database.version}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Status;
