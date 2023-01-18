const file = require('./output.json')
const fs = require("fs");

const swaggerFile = JSON.parse(fs.readFileSync('./swagger/output.json'));
module.exports = swaggerFile;