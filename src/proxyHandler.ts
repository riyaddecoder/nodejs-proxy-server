import { requestParser } from './helper/requestPerser'
import { proxyHandlerType } from './types'

const proxyHandler: proxyHandlerType = {}

proxyHandler.handler = (req, res) => {
  proxyHandler.callProxy(req, (statusCode, data) => {
    res.writeHead(statusCode)
    res.end(JSON.stringify(data))
  })
}

proxyHandler.callProxy = async (req, callback) => {
  const response = await global.fetch(
    process.env.ROOT_DOMAIN + req.url,
    requestParser(req),
  )

  if (response.ok) {
    const responseData = await response.json()
    callback(response.status, responseData)
  } else {
    callback(response.status, response.statusText)
  }
}

export default proxyHandler
