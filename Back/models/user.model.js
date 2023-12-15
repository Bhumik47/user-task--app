
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: Sequelize.STRING,
            allowNull:false
        }
    },{
        // Define timestamps for created and updated attributes
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    });

    User.sync({ alter: true })
        .then(() => {
            console.log('User model synchronized successfully.');
        })
        .catch((error) => {
            console.error('Error synchronizing User model:', error);
        });

    return User;
}