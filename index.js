const Hapi  = require('hapi')
    , Inert = require('inert')

const server = new Hapi.Server()

server.connection({ port: process.env.PORT || 8080, host: '0.0.0.0' })


server.register(Inert, (err) => {

    if (err)
        throw err

    server.route({
        method: 'GET',
        path: '/',
        handler: function (request, reply) {
            reply.file('./dist/home.html')
        }
    })

    server.route({
        method: 'GET',
        path: '/{rota*}',
        handler: function (request, reply) {
            reply.file('./dist/home.html')
        }
    })

    server.route({  
        method: 'GET',
        path: '/js/{file*}',
        handler: {
            directory: { 
                path: 'dist/js'
            }
        }
    })

    server.route({  
        method: 'GET',
        path: '/img/{file*}',
        handler: {
            directory: { 
                path: 'dist/img'
            }
        }
    })    

    server.route({  
        method: 'GET',
        path: '/css/{file*}',
        handler: {
            directory: { 
                path: 'dist/css'
            }
        }
    })    

    server.route({  
        method: 'GET',
        path: '/lib/{file*}',
        handler: {
            directory: { 
                path: 'node_modules'
            }
        }
    })

})

server.start((err) => {

    if (err)
        throw err

    console.log(`Server running at: ${server.info.uri}`)
})
