import 'dotenv/config'
import proxyHandler from './proxyHandler'
import serverService from './server'

serverService?.startServer(proxyHandler.handler)
