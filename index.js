

const express = require('express')
const router = require('./routes/index')
const PORT = process.env.PORT || 8080
const sequelize = require('./database/db')
const models = require('./models/models')
const errorHandler = require('./middleware/errorHandler')
const cors = require('cors') 
const passport = require('passport')
const mongoose = require('mongoose')

const app = express()
app.use(cors())
app.use(express.json())
app.use(passport.initialize())
require('./middleware/passport')(passport)
app.use('/api', router)




app.use(errorHandler)
const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        await mongoose.connect(
            `mongodb://127.0.0.1:27017/stake_logs`, 
        ).then(() => console.log("ok"));
        app.listen(PORT, () => console.log(`server started on port ${PORT}`))
    } catch(e){
        console.log(e)
    }
}




start()


module.exports = app




/* 

app.use(express.json())
app.use('/api', userRouter)
app.use('/api', stakeRouter)
///////////////////////////////////////////////
app.post('/userss', (req,res) => {
    Users.create(req.body).then(() => {
        res.send('user is inserted') 
    })
})
///////////////////////////////////////////////
app.listen(PORT, () => console.log(`server started on port ${PORT}`))
*/
