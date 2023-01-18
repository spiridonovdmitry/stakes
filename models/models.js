const sequelize = require('../database/db')
const {DataTypes} = require('sequelize')


const Users = sequelize.define('users', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    login: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
    role: {type: DataTypes.INTEGER, defaultValue: 2}
    

})

const Stakes = sequelize.define('stakes', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      category: {
        type: DataTypes.STRING,
      },
      stake_name: {
        type: DataTypes.STRING,
      },
      user_count: {
        type: DataTypes.INTEGER,
      },
      date_end: {
        type: DataTypes.DATE,
      },
      date_event: {
        type: DataTypes.DATE,
      }


})



const Stake_review = sequelize.define('stake_review', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      review: {
        type: DataTypes.TEXT,
      },
      review_date: {
        type: DataTypes.DATE,
      }
})



const Stake_info = sequelize.define('stake_info', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      stake_sum: {
        type: DataTypes.INTEGER,
      }
})



const User_info = sequelize.define('user_info', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },

    first_name: {
        type: DataTypes.STRING,
    },
    second_name: {
        type: DataTypes.STRING,
    },
    patronymic: {
        type: DataTypes.STRING,
    },
    sum: {
        type: DataTypes.DOUBLE,
    },
    stake_count: {
        type: DataTypes.INTEGER,
    },
    birth_date: {
        type: DataTypes.DATE,
    }
})



const Results = sequelize.define('results', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      result_name: {
        type: DataTypes.STRING,
      },
      coefficient: {
        type: DataTypes.DOUBLE,
      },
})


Users.hasOne(User_info)
User_info.belongsTo(Users)

Stakes.hasMany(Results)
Results.belongsTo(Stakes)

Stakes.hasMany(Stake_review)
Stake_review.belongsTo(Stakes)

Results.hasMany(Stake_info)
Stake_info.belongsTo(Results)

Stakes.hasMany(Stake_info)
Stake_info.belongsTo(Stakes)

Users.hasMany(Stake_info)
Stake_info.belongsTo(Users)


module.exports = {
    Users,
    User_info,
    Stakes,
    Stake_info,
    Stake_review,
    Results
}