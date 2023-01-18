const UserRepository = require("../repositories/user_repository")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const mongoLogger = require("../helpers/mongoLogger");
const Response = require("../helpers/response")
const generateJwt = async(id, login, role) => {
    return jwt.sign(
        {id: id, login, role},
        "123",
        {expiresIn: 60*60}
    )
}

class UserService{

    


    async registration(info){
        const {email, password, login, role} = info
        const hashPassword = await bcrypt.hash(password, 5)

        const user = await UserRepository.registration(login, hashPassword, email, role)  
        const {id} = user
        
        const token = await generateJwt(id, login, role)
        return token
    }
 
     async getUsers(){
         
         return await UserRepository.getUsers()
     }
 
     async getOneUser(id){

         return await UserRepository.getOneUser(id)
     }
 
     async updateUser(id, info){
         const {login, password, email, role} = info

         return await UserRepository.updateUser(id, info) 
     }
 
     async deleteUser(id){
    
         return await UserRepository.deleteUser(id)
     }
     async getProfile(id){

         return await UserRepository.getProfile(id)
     }
 
     async getUserStakes(id){
    
         return UserRepository.getUserStakes(id)
     }
 
     async getTop(){
         return UserRepository.getTop()
     }
 
     async makeStake(info){
         const sum = await UserRepository.makeStake(info)
         const {stake_sum} = info
         let new_sum = sum - stake_sum
         const {userId} = info
         await UserRepository.updateSum(userId, new_sum)
         return new_sum
     }
 
     async check(req, res, next){
         
    
     }
 
     async login(login, password){
       const user = await UserRepository.findByLogin(login)

       if(user){
            const passwordResult = bcrypt.compareSync(password, user.password)
            if(passwordResult){
                const token = generateJwt(user.id, login, user.role)
                return token
            }
            else {

                mongoLogger.storeError({message:"incorrect password", status: 401, route:"/login"});
                return (new Response("incorrect password", 401))
            }
       }

       else {
        mongoLogger.storeError({message:"invalid login", status: 404, route:"/login"});
        return (new Response("invalid login", 404));
       }
     }


}



module.exports = new UserService();