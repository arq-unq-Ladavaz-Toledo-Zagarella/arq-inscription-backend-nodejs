
import express from 'express'
import bodyParser from 'body-parser'


// Connects to mongoose
import mongoose from 'mongoose'
mongoose.connect('mongodb://localhost/materias')


// Express configuration
const app = express()
app.use(bodyParser.json())

import routes from './routes/routes.js'
app.use(routes)

//Static resources
app.use(express.static(__dirname + "/../../dist/frontend"))

// Express startup
const port = 3001
app.listen(port, () => console.log(`Server running in port ${port}`))