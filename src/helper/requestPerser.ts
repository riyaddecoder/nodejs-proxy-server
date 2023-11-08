import * as http from 'http'

export const requestParser = (req: http.IncomingMessage) => {
  const requestBody: RequestInit = {
    method: req.method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    },
  }

  if (req.method !== 'GET') {
    requestBody.body = JSON.stringify({})
  }

  return requestBody
}
