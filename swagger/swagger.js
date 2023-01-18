const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'});

const doc = {
    info: {
        version: '',      // by default: '1.0.0'
        title: 'API',        // by default: 'REST API'
        description: 'Web application',  // by default: ''
    },
    host: 'localhost:8080',      // by default: 'localhost:3000' -- NO! by default empty (but used current host)!
    basePath: '',  // by default: '/'
    schemes: [],   // by default: ['http']
    consumes: [],  // by default: ['application/json']
    produces: [],  // by default: ['application/json']
    tags: [        // by default: empty Array
        {
            name: 'users',         // Tag name
            description: 'Users API',  // Tag description
        },
        {
            name: 'stakes',         // Tag name
            description: 'Tickets API',  // Tag description
        },
        {
            name: 'results',         // Tag name
            description: 'Seances API',  // Tag description
        },
        // { ... }
    ],
    securityDefinitions: {
        bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT'
        }
    },  // by default: empty object (Swagger 2.0)
    definitions: {},          // by default: empty object
    components: {}            // by default: empty object (OpenAPI 3.x)
};


const outputFile = './swagger/output.json';
const endpointsFiles = ['./routes/index.js'];

/* NOTE: if you use the express Router, you must pass in the
   'endpointsFiles' only the root file where the route starts,
   such as: index.js, app.js, routes.js, ... */

swaggerAutogen(outputFile, endpointsFiles, doc);