import * as http from 'http'

export const requestParser = async (req: http.IncomingMessage) => {
  const requestBody: RequestInit = {
    method: req.method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
    },
  }

  if (req.method !== 'GET') {
    const bodyChunks: Uint8Array[] = []
    for await (const chunk of req) {
      bodyChunks.push(chunk)
    }
    const requestBodyBuffer = Buffer.concat(bodyChunks)
    requestBody.body = requestBodyBuffer.toString('utf8') || '{}'
  }

  return requestBody
}
