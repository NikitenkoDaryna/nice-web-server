const http = require('http')

const geocode = (address, callback) => {
    const url = `http://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZGFyYTEzIiwiYSI6ImNrcjB2NjF2aDF2eWwyb28xNDlyc256c3YifQ.3EL7tfV2mCvsdsOUZG_uxA&limit=1`

    const request = http.request(url, (response) => {
        let buffer = ''
        response.on('data', (chunk) => {
            buffer += chunk
        })
        response.on('end', () => {
            const parsedData = JSON.parse(buffer)
            if (parsedData.features.length === 0) callback('Unable to find location. Try another search.', undefined)
            else {
                callback(undefined, {
                    latitude: parsedData.features[0].center[1],
                    longitude: parsedData.features[0].center[0],
                    location: parsedData.features[0].place_name
                })
            }
        })
    })
    request.on('error', (error) => {
        callback(`Unable to connect to location services. Error: ${error}`, undefined)
    })
    request.end()
}

module.exports = geocode
