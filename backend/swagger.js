const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Fit Booking API',
    description: 'Automatically generated documentation',
  },
  host: 'localhost:5000/api',
  schemes: ['http']
};

const outputFile = './src/swagger-output.json';
const endpointsFiles = ['./src/routes/api.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
