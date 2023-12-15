
module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
        description: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        isCompleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false
        },
        list_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    }, {
        // Define timestamps for created and updated attributes
        timestamps: true,
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    });

    Task.sync({ alter: true })
        .then(() => {
            console.log('Task model synchronized successfully.');
        })
        .catch((error) => {
            console.error('Error synchronizing Task model:', error);
        });

    return Task;
}