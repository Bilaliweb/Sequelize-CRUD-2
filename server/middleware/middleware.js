const { head } = require("../route/route")
const events = require('events')
const eventEmitter = new events.EventEmitter()


module.exports = (req, res, next) => {
            // function handleRequest(req){
            //     console.log(new Map(req.headers))
            //     return new Response('This is name of header')
            // }
            
            // // addEventListener("headerName", event => {
            // //         return event.respondWith(handleRequest(event))
            // //     })
            
            //     eventEmitter.on(handleRequest, () => {
            //             console.log("Header is: " + res.headers)
            //         })
            // var header = req.headers['host']
            console.log('This is middleware for route: ' + req.originalUrl)
            next()
            
        }