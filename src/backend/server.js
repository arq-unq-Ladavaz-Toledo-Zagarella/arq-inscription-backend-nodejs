import app from "./app"
import swaggerTools from 'swagger-tools';
import swaggerDoc from './swagger.json';
import routes from './routes/routes.js';
import logger from './helpers/winston.js';

import mongoose from 'mongoose'
mongoose.connect('mongodb://root:root@ds249605.mlab.com:49605/arquitectura')
//mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/careers')

// Express startup
//const port = process.env.PORT
const port = 3001


app.disable('etag');

const optionsSwagger = { swaggerUi: '/swagger.json', controllers: './src/backend/routes' };

swaggerTools.initializeMiddleware(swaggerDoc, middleware => {
    app.use(middleware.swaggerMetadata());
    app.use(middleware.swaggerValidator());
    app.use(middleware.swaggerRouter(optionsSwagger));
    app.use(middleware.swaggerUi());
	app.listen(process.env.PORT || port);
});

/*var winston = require('winston');
require('winston-loggly-bulk');
 
 winston.add(winston.transports.Loggly, {
    token: "a17443aa-eeb0-40ad-a7e8-8dd5ef2e903f",
    subdomain: "sladavaz",
    tags: ["Winston-NodeJS"],
    json:true
});
*/

//logger.log('info',"Start app");