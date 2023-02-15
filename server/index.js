const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const router = express.Router()
const db = require('./config/config')
const port = 8080

//////////// Database Authentication
db.authenticate()
.then(() => {
    console.log('Database connection is successful...')
})
.catch((err) => {
    console.log('Error is here...' + err)
})

const app = express()
app.use(bodyParser.json())
app.use(cors("*"))

//////////// Using router defined in routes file
app.use('/', require('./route/route'))  

db.sync().then(() => {

    app.listen(port, () => 
        console.log(`App is listening on port: ${port}`))
})

module.exports = router