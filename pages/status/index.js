import useSWR from "swr";

import UpdatedAt from "../components/UpdatedAt";

import style from "./status.module.css";

function Status() {
  const { data, error, isLoading } = useSWR("/api/v1/status", fetcher, {
    refreshInterval: 2000,
  });

  async function fetcher(key) {
    const response = await fetch(key);
    return response.json();
  }

  if (error) {
    return (
      <div className={style.statusPage}>
        <h2>Error while getting status</h2>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className={style.statusPage}>
        <h2>Loading data...</h2>
      </div>
    );
  }

  return (
    <div className={style.statusPage}>
      <div className={style.status}>
        <h1>Status page</h1>

        <div className={style.statusGroup}>
          <h2>Database status</h2>

          <div className={style.statusItem}>
            <p>Max connections:</p>
            <span>{data.dependencies.database.max_connections}</span>
          </div>

          <div className={style.statusItem}>
            <p>Opened connections:</p>
            <span>{data.dependencies.database.opened_connections}</span>
          </div>

          <div className={style.statusItem}>
            <p>Postgres version</p>
            <span>{data.dependencies.database.version}</span>
          </div>
        </div>
      </div>

      <UpdatedAt date={data.updated_at} />
    </div>
  );
}

export default Status;
