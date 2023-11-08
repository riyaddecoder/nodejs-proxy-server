import * as http from 'http'
import { ServerHandlerType } from './types'

type serverServiceType = {
  startServer?: (handler: ServerHandlerType) => void
}

const serverService: serverServiceType = {}

serverService.startServer = (handler: ServerHandlerType) => {
  const server = http.createServer(handler)

  server.listen(process.env.PORT, () => {
    console.log('Server started')
  })
}

export default serverService
