const fastify = require('fastify')({ 
    logger: true,
    frameworkErrors: function (error, req, res) {
        if (error instanceof FST_ERR_BAD_URL) {
          res.code(400)
          return res.send("Provided url is not valid")
        } else {
          res.send(err)
        }
    }
})
const helmet = require('fastify-helmet')
const path = require('path')
const port = process.env.PORT || 3000

// Define paths
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = '../partials'

fastify.register(
        helmet
)

fastify.register(require('point-of-view'), {
    engine: {
      handlebars: require('handlebars'),
    },
    root:viewsPath,
    includeViewExtension: true,
    options: {
      partials: {
        footer: partialsPath+'/footer.hbs',
        header: partialsPath+'/header.hbs',
      },
    } 
  });

fastify.register(require('fastify-static'), {
    root: path.join(publicDirectoryPath),
 })

fastify.register(require('../routes/routes'))

const start = async () => {
    try {
        await fastify.listen(port)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()