const Router = require('express')
const router = new Router()
const userRouter = require('./userRouter')
const resultRouter = require('./resultRouter')
const stakeRouter = require('./stakeRouter')
const mongoLogger = require("../helpers/mongoLogger");
const swaggerDocument = require('../swagger/output.json');
const swaggerUi = require('swagger-ui-express');
router.use('/docs', swaggerUi.serve);
router.get('/docs', swaggerUi.setup(swaggerDocument));
router.use(mongoLogger.storeEvent);
router.use('/user', userRouter)

router.use('/stake', stakeRouter)
router.use('/result', resultRouter)


module.exports = router