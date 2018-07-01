const autocannon = require('autocannon');

const handleResponse = (client, statusCode, resBytes, responseTime) => {
  console.log(`Got response with code ${statusCode} in ${responseTime} milliseconds`);
}
const handleResults = (result) => console.log(result);

const login = autocannon({
  url: 'http://localhost:3001/#/question/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjVhODQ3ODM1NzM0ZDFkMTUyM2RiZDAxNyJ9.U41-pLk2dt20AWZMiH8VuuCrCDVJFe__kbiNR-T8-yM',
  connections: 2000, //default
  pipelining: 1, // default
  duration: 600 // default
}, (err,result) => handleResults(result));
login.on('response',handleResponse);

