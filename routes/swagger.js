const express = require("express");
const router = express.Router();
const swaggerUi = require("swagger-ui-express");
const file = require("../swagger/swagger_ui");
router.get("/", swaggerUi.serve,swaggerUi.setup(file),(request,response)=>{response.status(200);response.end();});

module.exports = router