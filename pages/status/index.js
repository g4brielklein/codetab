import useSWR from "swr";

function Status() {
  const { data, error, isLoading } = useSWR("/api/v1/status", fetcher, {
    refreshInterval: 60000,
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

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}

export default Status;
