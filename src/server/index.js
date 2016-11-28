const path = require('path')
const server = require('./server')

server.setup({
  logDirectory: path.resolve(__dirname, '../../logs')
})
