const Hapi = require('hapi')
const server = new Hapi.Server()

server.connection({ port: process.env.PORT || 8080, host: '0.0.0.0' })

server.register(require('inert'), (err) => {

    if (err)
        throw err

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file('./app/home.html')
        }
    })
    server.route({
        method: 'GET',
        path: '/*',
        handler: function (request, reply) {
            reply.file('./app/home.html')
        }
    })

})

server.start((err) => {

    if (err)
        throw err

    console.log(`Server running at: ${server.info.uri}`)
})
