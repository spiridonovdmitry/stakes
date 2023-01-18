const Router = require('express')
const router = new Router()
const resultController = require('../controller/result_controller')
const ResultScheme = require('../schemes/results')
const validate = require('../middleware/validate')
const passport = require("passport")
const isAdmin = require("../middleware/isAdmin")


router.post('/:id',validate(ResultScheme.create), passport.authenticate('jwt', {session: false}), isAdmin, resultController.createResult)
router.get('/:id', passport.authenticate('jwt', {session: false}), isAdmin, resultController.getResult)
router.get('/all/:id', passport.authenticate('jwt', {session: false}), resultController.getResults)
router.put('/:id', validate(ResultScheme.update), passport.authenticate('jwt', {session: false}), isAdmin, resultController.updateResult)
router.delete('/:id', passport.authenticate('jwt', {session: false}), isAdmin, resultController.deleteResult)
module.exports = router