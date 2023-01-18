const ApiError = require('../error/ApiError');

const UserService = require('../services/user_service')
const jwt = require("jsonwebtoken")

class UserController{
    async registration(req, res){
        return res.json(await UserService.registration(req.body))   
    }

    async getUsers(req, res){
       
        return res.json(await UserService.getUsers())
    }

    async getOneUser(req, res){
        const id = req.params.id
        return res.json(await UserService.getOneUser(id))
    }

    async updateUser(req, res){
        const id = req.params.id
        const info = req.body

        return res.json(await UserService.updateUser(id, info))
    }

    async deleteUser(req, res){
        const id = req.params.id
      
        return res.json(await UserService.deleteUser(id))
    }

    async getProfile(req, res){
        const id = req.params.id
        
        return res.json(await UserService.getProfile(id))
    }

    async getUserStakes(req, res){
        const id = req.params.id
        
        return res.json(await UserService.getUserStakes(id))
    }

    async getTop(req, res){
      
        return res.json(await UserService.getTop())
    }

    async makeStake(req, res){
        const info = req.body
        return res.json(await UserService.makeStake(info))
    }

    async check(req, res, next){
        
   
    }

    async login(req, res){
      const {login, password} = req.body
      console.log(login, password)
      const token = await UserService.login(login, password)
      const {message, status} = token 
      if(message) {
        res.status(status)
          return res.json(token)
      }
      else {
          return res.json({
            token: `Bearer ${token}`
        })

      }
    }
}

module.exports = new UserController()