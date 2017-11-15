import app from "./app"

import mongoose from 'mongoose'
//mongoose.connect('mongodb://root:root@ds249605.mlab.com:49605/arquitectura')
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/careers')

// Express startup
//const port = process.env.PORT
const port = 3001

app.listen(port, () => console.log(`Server running on port ${port}`))