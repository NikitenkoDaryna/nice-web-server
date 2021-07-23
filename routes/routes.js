const geocode = require('../src/utils/geocode')
const forecast = require('../src/utils/forecast')

function itemRoutes (fastify, options, done) {
    fastify.get('/', (req, reply) => {
        reply.view('index.hbs', {
            title: 'Weather App',
            name: 'Daryna'
        })
    })
    
    fastify.get('/about',(req,reply) => {
        reply.view('about',{
            title:'About Me',
            name: 'Daryna'
        })
    })
    
    fastify.get('/help',(req, reply) => {
        reply.view('help',{
          helpText:'This is some helpful text',
          title: 'Help',
          name: 'Daryna'
        })
    })
    
    fastify.get('/weather',(req, reply) => {
      const address = req.query.address
    
        if (!address) {
            return reply.send({error: "You must provide an address"})
        }
        
        geocode(address, (error, response) => {
          if (response === undefined){
              return reply.send({errorMessage: error})
          }
          const { latitude, longitude, location } = response
          forecast(latitude, longitude, (error, forecastData) => {
              if (!forecastData){
                  return reply.send({errorMessage: error})
              }
              reply.send({
                  forecast: forecastData,
                  location,
                  address: address
              })
          })
      })
    })

    done()
}

module.exports = itemRoutes