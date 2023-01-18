const Router = require('express')
const router = new Router()
const stakeController = require('../controller/stake_controller')
const StakeScheme = require('../schemes/stakes')
const validate = require("../middleware/validate");
const passport = require("passport")
const isAdmin = require("../middleware/isAdmin")

router.post('/', validate(StakeScheme.create), passport.authenticate('jwt', {session: false}), isAdmin, stakeController.createStake)
router.get('/', passport.authenticate('jwt', {session: false}), stakeController.getStakes)
router.get('/:id', passport.authenticate('jwt', {session: false}), stakeController.getOneStake)
router.put('/:id', validate(StakeScheme.update), passport.authenticate('jwt', {session: false}), isAdmin, stakeController.updateStake)
router.delete('/:id', passport.authenticate('jwt', {session: false}), isAdmin,  stakeController.deleteStake)
router.post('/review/:id',validate(StakeScheme.create_review) , passport.authenticate('jwt', {session: false}), stakeController.createReview)
router.get('/review/:id', passport.authenticate('jwt', {session: false}), stakeController.getReviews)
router.get('/popular', stakeController.getPopularStakes)
router.get('/end/:id', passport.authenticate('jwt', {session: false}), isAdmin, stakeController.endStake)
module.exports = router