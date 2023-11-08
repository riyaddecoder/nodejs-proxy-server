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
  try {
    const response = await global.fetch(
      process.env.ROOT_DOMAIN + req.url,
      await requestParser(req),
    )

    if (response.ok) {
      const responseData = await response.json()
      callback(response.status, responseData)
    } else {
      callback(response.status, response.statusText)
    }
  } catch (error) {
    console.error('Error while parsing response:', error)
    callback(500, 'Internal Server Error')
  }
}

export default proxyHandler
