
module.exports = (sequelize, Sequelize) => {
    const List = sequelize.define("lists", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        // Define timestamps for created and updated attributes
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    });

    List.sync({ alter: true })
        .then(() => {
            console.log('List model synchronized successfully.');
        })
        .catch((error) => {
            console.error('Error synchronizing List model:', error);
        });

    return List;
}