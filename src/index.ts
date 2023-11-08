import * as http from 'http'

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.end('Hello, World!\n')
})

// Define the port to listen on
const port = 3000

// Start the server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
