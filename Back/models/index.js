const { dbConfig } = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: "postgres",
})

const db = {
    sequelize,
    Sequelize,
    user: require("./user.model.js")(sequelize, Sequelize),
    list: require("./list.model.js")(sequelize, Sequelize),
    task: require("./task.model.js")(sequelize, Sequelize),
}

db.user.hasMany(db.list, { foreignKey: "user_id" });
db.list.belongsTo(db.user, { foreignKey: "user_id" });

db.list.hasMany(db.task, { foreignKey: "list_id" });
db.task.belongsTo(db.list, { foreignKey: "list_id" });



module.exports = db;