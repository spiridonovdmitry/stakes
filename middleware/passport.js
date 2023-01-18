const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const UserRepository = require("../repositories/user_repository")

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: "123"


}


module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try{
            const user = await UserRepository.getOneUser(payload.id)
            if (user){
                done(null, user)
            } else {
                done(null, false)
            }
            } catch (e){
                console.log(e)
            }
        })

    )
}