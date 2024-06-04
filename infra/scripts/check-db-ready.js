const { exec } = require('node:child_process')

const checkDbReady = () => {
  exec('docker exec postgres-dev pg_isready --host localhost', (error, stdout) => {
    process.stdout.write('.')

    if (stdout.search('accepting connections') !== -1) {
      return console.log('\n\n 🟢 Postgres ready to accept connections')
    }
    checkDbReady()
  })
}

process.stdout.write('\n\n 🚥 Waiting while Postgres get ready')
checkDbReady()
