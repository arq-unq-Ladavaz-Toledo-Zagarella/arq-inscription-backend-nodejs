var logger = require('winston');
require('winston-loggly-bulk');
 
 logger.add(logger.transports.Loggly, {
    token: "a17443aa-eeb0-40ad-a7e8-8dd5ef2e903f",
    subdomain: "sladavaz",
    tags: ["Winston-NodeJS"],
    json:true
});


module.exports = logger;
