import * as http from 'http'

export type ServerHandlerType = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => void

export type proxyHandlerType = {
  handler?: ServerHandlerType
  callProxy?: (callback: (statusCode: number, data?: string) => void) => void
}
