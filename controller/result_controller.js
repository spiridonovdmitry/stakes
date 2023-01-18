//const db = require('../db')
const ApiError = require('../error/ApiError');
const {Results} = require('../models/models')

class ResultController{
    async createResult(req, res){ 
          const stakeId = req.params.id
      
          const {result_name, coefficient} = req.body
          const result = await Results.create({
            result_name, coefficient,  stakeId
        }) 
        return res.json(result)
    }

    async getResult(req, res){
        const id = req.params.id
        console.log(id)
        const result = await Results.findOne({
            where: {id}
        }) 
        return res.json(result)
    }

    async getResults(req, res){
        const id = req.params.id
        const results = await Results.findAll({
            where: {stakeId : id}
        })
        return res.json(results)

    }

    async updateResult(req, res){
        const id = req.params.id
        const {result_name, coefficient} = req.body
        const result = await Results.update({result_name, coefficient},{
            where: {id}
        }) 
        return res.json(result)
    }

    async deleteResult(req, res){
        const id = req.params.id
        const result = await Results.destroy({
            where: {id}
        }) 
        return res.json({message : "ok"})
    }
}

module.exports = new ResultController()

