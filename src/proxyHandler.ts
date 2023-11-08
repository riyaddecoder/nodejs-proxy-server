import { proxyHandlerType } from './types'

const proxyHandler: proxyHandlerType = {}

proxyHandler.handler = (req, res) => {
  proxyHandler.callProxy((statusCode, data) => {
    res.writeHead(statusCode)
    res.end(JSON.stringify(data))
  })
}

proxyHandler.callProxy = async callback => {
  const response = await global.fetch(process.env.ROOT_DOMAIN, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    },
    body: JSON.stringify({}),
  })

  if (response.ok) {
    const responseData = await response.json()
    callback(response.status, responseData)
  } else {
    callback(response.status, response.statusText)
  }
}

export default proxyHandler
