const Sequelize = require('sequelize')
const dotenv = require('dotenv')

dotenv.config()

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    operatorsAliases: 0,

    pool: {
      max: parseInt(process.env.DB_POOL_MAX),
      min: parseInt(process.env.DB_POOL_MIN),
      acquire: parseInt(process.env.DB_POOL_ACQUIRE),
      idle: parseInt(process.env.DB_POOL_IDLE)
    }
  }
)

// re-sync (create table)
// sequelize.sync({ alter: true }).then(() => {
//   console.log(`Database & tables ready!`)
// })

const db = {}
db.Sequelize = Sequelize // Datatypes
db.sequelize = sequelize

// Import model
db.user = require('../model/user.model')(sequelize, Sequelize)
db.favorite = require('../model/favorite.model')(sequelize, Sequelize)
db.episodeRead = require('../model/episodeRead.model')(sequelize, Sequelize)
db.episodeBuy = require('../model/episodeBuy.model')(sequelize, Sequelize)

// Associations
db.user.hasMany(db.favorite, { as: 'favorite' })
db.favorite.belongsTo(db.user, {
  foreignKey: 'userId',
  as: 'user'
})

db.user.hasMany(db.episodeRead, { as: 'episodeRead' })
db.episodeRead.belongsTo(db.user, {
  foreignKey: 'userId',
  as: 'user'
})

db.user.hasMany(db.episodeBuy, { as: 'episodeBuy' })
db.episodeBuy.belongsTo(db.user, {
  foreignKey: 'userId',
  as: 'user'
})

module.exports = db
