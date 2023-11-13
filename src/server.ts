import * as http from 'http'
import { ServerHandlerType } from './types'

type serverServiceType = {
  startServer?: (handler: ServerHandlerType) => void
}

const serverService: serverServiceType = {}

serverService.startServer = (handler: ServerHandlerType) => {
  //Alowing CORS
  const server = http.createServer((req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    res.setHeader('Access-Control-Max-Age', '3600')

    if (req.method === 'OPTIONS') {
      res.writeHead(204)
      res.end()
      return
    }

    handler(req, res)
  })

  if (process.env.PORT) {
    server.listen(process.env.PORT, () => {
      console.log(`Server started at port ${process.env.PORT}`)
    })
  } else {
    // Listen on the default IP address if port is not available in .env
    server.listen()

    // Event listener for the 'listening' event
    server.on('listening', () => {
      console.log(`Server is listening...`)
    })
  }
}

export default serverService
