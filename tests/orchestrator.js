import retry from 'async-retry'

async function waitForAllServices () {
  await waitForWebServer()

  async function waitForWebServer () {
    return retry(fetchStatusPage)

    async function fetchStatusPage() {
      const res = await fetch('http://localhost:3000/api/v1/status')
      const resBody = await res.json()
    }
  }
}

export default { waitForAllServices }
