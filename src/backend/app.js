require('newrelic');
import express from 'express'
import bodyParser from 'body-parser'

//Express configuration
const app = express()
app.use(bodyParser.json())

import routes from './routes/routes.js'
app.use(routes)

//Static resources
app.use(express.static(__dirname + "/../../dist/frontend"))

process.title = 'inscription'

export default app