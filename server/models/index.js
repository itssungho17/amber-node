const config = require("../config/db.config.js")
const { Sequelize } = require("sequelize")

const sequelize = new Sequelize(config.name, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  pool: {
    max: 10,
    min: 0,
    acquire: 10000,
    idle: 10000
  }
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
db.User = require('./user.model.js')(sequelize, Sequelize)
db.Device = require('./device.model.js')(sequelize, Sequelize)
// db.Amber = require('./amber.model.js')(sequelize, Sequelize)

module.exports = db
