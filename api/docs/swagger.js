// server/docs/swagger.js
const swaggerJsDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'WhyImBroke API',
      version: '1.0.0',
      description: 'API documentation for WhyImBroke'
    },
    servers: [
      {
        url: 'http://localhost:5000/api/v1'
      }
    ]
  },
  apis: ['./routes/*.js'] // Path to the API routes
};

module.exports = swaggerJsDoc(options);