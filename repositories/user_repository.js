const {Users} = require('../models/models')
const {User_info} = require('../models/models')
const {Stake_info} = require('../models/models')

class UserRepository{
    async registration(login, password, email, role){
        
        const user = await Users.create({login, password, email, role})
        return user  
     }

     async getUsers(){
       
        return await Users.findAll()
    }

    async getOneUser(id){
        const user = await Users.findOne({
            where: {id}
        }) 
        return user
    }

    async updateUser(id, info){
        const {login, password, email, role} = info
        const user = await Users.update({login, password, email, role},{
            where: {id}
        }) 
        return user
    }

    async deleteUser(id){
        const user = await Users.destroy({
            where: {id}
        }) 
        return 0
    }
    async getProfile(id){
        const user = await User_info.findOne({
            where: {id}
        }) 
        return user
    }

    async getUserStakes(id){
        const stakes = await Stake_info.findAll({
            where: {userId: id}
        }) 
        return stakes
    }

    async getTop(){
        const top = await User_info.findAll({
            order: [['sum', 'DESC']]
        })
        return top
    }

    async makeStake(info){
        const {userId, stakeId, resultId, stake_sum} = info
        const stake = await Stake_info.create({
            userId, stakeId, resultId, stake_sum
        })
        const user = await User_info.findAll({
            where: {userId},
            plain: true
        })
        const {sum} = user
 
        return sum
    }

    async updateSum(userId, new_sum){
        const new_user = await User_info.update({sum : new_sum},
            {
                where: {userId},
            })
        return 0
    }
    
    async check(req, res, next){
        
   
    }

    async findByLogin(login){
        const user = await Users.findOne({
            where: {login : login}
        })
        return user
    }
    async login(password){
      
    }
}


module.exports = new UserRepository()