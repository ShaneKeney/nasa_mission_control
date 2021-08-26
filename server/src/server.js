const http = require('http')
const app = require('./app')
const { loadPlanets } = require('./models/planets')

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

async function startServer() {
  await loadPlanets()

  server.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}...`)
  })  
}

startServer()

