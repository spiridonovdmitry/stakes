//const db = require('../db')
const ApiError = require('../error/ApiError');
const {Stakes, User_info} = require('../models/models')
const {Stake_review} = require('../models/models')
const {Results} = require('../models/models')
const {Stake_info} = require('../models/models')
class StakeController{
    async createStake(req, res){
       const {stake_name} = req.body
       const {category} = req.body
       const {user_count} = req.body
       const {date_end} = req.body
       const {date_event} = req.body
       const stake = await Stakes.create({stake_name, category, user_count, date_end, date_event})
       return res.json(stake)   
    }

    async getStakes(req, res){
        const stakes = await Stakes.findAll()
        return res.json(stakes)
    }

    async getOneStake(req, res){
        const id = req.params.id
        const stake = await Stakes.findOne({
            where: {id}
        }) 
        return res.json(stake)
    }

    async updateStake(req, res){
        const id = req.params.id
        const {stake_name, category, user_count, date_end, date_event} = req.body
        const stake = await Stakes.update({stake_name, category, user_count, date_end, date_event},{
            where: {id}
        }) 
        return res.json(stake)
    }

    async deleteStake(req, res){
        const id = req.params.id
        const stake = await Stakes.destroy({
            where: {id}
        }) 
        return res.json({message : "ok"})
    }
    async createReview(req, res){
        const stakeId = req.params.id
        const {review, review_date} = req.body
        const Review = await Stake_review.create({stakeId, review, review_date})
        return res.json(Review)   
    }

    async getReviews(req, res){
        const id = req.params.id
        const reviews = await Stake_review.findAll({
            where: {stakeId : id}
        }) 

        return res.json(reviews)
    }

    async getPopularStakes(req, res){
        const top = await Stakes.findAll({
            order: [['user_count', 'DESC']]
        })
        return res.json(top)
    }

    async endStake(req, res){
        const stakeId = req.params.id
        const stakes = await Stake_info.findAll({
          where: {stakeId},
          raw: true
        })
        
        
        for (var i = 0; i <= stakes.length - 1; i++) {
            const {stake_sum, resultId, userId} = stakes[i]

            const coefficient1 = await Results.findOne({
                attributes: ['coefficient'],
                where: {id : resultId},
                raw : true,
                
            }, {}) 
            
            const {coefficient} = coefficient1

            const user1 = await User_info.findAll({
                where: {userId},
                plain: true
            })
            const {sum} = user1
            let new_sum = coefficient * stake_sum + sum 
            const user = User_info.update({sum : new_sum}, {where: {userId}})
            
            const stake_inf = await Stake_info.destroy({
                where: {stakeId}
            }) 
        }
        
        return res.json({message : "ok"})
    }
}

module.exports = new StakeController()

