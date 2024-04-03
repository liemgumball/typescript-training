const jsonServer = require('json-server') // importing json-server library
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()
const localIpAddress = require('local-ip-address')
const Logger = require('@ptkdev/logger')
const port = process.env.PORT || 3001 // use any port number here
const logger = new Logger()

server.use(middlewares)
server.use(router)

server.listen(port, () => {
    logger.info(
        `JSON Server is running - http://localhost:${port} - http://${localIpAddress()}:${port}`,
    )
})
