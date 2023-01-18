
const Router = require('express')
const router = new Router()
const userController = require('../controller/user_controller')
const validate = require("../middleware/validate");
const UserScheme = require("../schemes/user");
const passport = require('passport')
const isAdmin = require('../middleware/isAdmin')
const isUser = require('../middleware/isUser')

router.post('/registration',validate(UserScheme.registration),  userController.registration)
router.post('/login', validate(UserScheme.login), userController.login)

// passport.authenticate('jwt', {session: false})
router.get('/all', passport.authenticate('jwt', {session: false}), isAdmin, userController.getUsers) 
router.get('/one/:id', passport.authenticate('jwt', {session: false}), isAdmin, userController.getOneUser)

router.put('/update/:id', passport.authenticate('jwt', {session: false}), isAdmin, validate(UserScheme.update), userController.updateUser)

router.delete('/delete/:id', passport.authenticate('jwt', {session: false}), isAdmin, userController.deleteUser)

router.get('/profile/:id', passport.authenticate('jwt', {session: false}), userController.getProfile)

router.get('/stake/:id', passport.authenticate('jwt', {session: false}), userController.getUserStakes)

router.get('/top', userController.getTop)
router.post('/makestake/', passport.authenticate('jwt', {session: false}), isUser, userController.makeStake)
module.exports = router

