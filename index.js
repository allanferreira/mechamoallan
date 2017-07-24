const Hapi  = require('hapi')
    , Inert = require('inert')
    , mongodb = require('mongodb')


var uri = 'mongodb://heroku_q6zr373f:lea1l3facssp39rmlmev474v83@ds145659.mlab.com:45659/heroku_q6zr373f'
mongodb.MongoClient.connect(uri, function(err, db) {
  
    if(err) throw err
    var blog = db.collection('blog')

    blog.find({}, (err, docs) => {

        docs.each(function(err, doc) {
            if(!doc) return
            
            console.log(doc)
        })

    })
})


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
