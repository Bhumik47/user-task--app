const db = require("../models");
const List = db.list;

exports.createList = async (req, res, next) => {
    try {
        const { name } = req.body;
        // Create a new list using the List model
        const newList = await List.create({
            user_id: req.userId,
            name: name
        });

        res.status(200).json({ message: "List created successfully", list: newList });
    } catch (error) {
        // Handle errors and pass to the error handling middleware
        next(error);
    }
};

exports.deleteList = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find the list by ID and delete it
        const deletedList = await List.destroy({ where: { id: id } });

        if (deletedList === 1) {
            res.status(200).json({ message: "List deleted successfully" });
        } else {
            res.status(404).json({ message: "List not found" });
        }
    } catch (error) {
        // Handle errors and pass to the error handling middleware
        next(error);
    }
};

exports.updateListName = async (req, res, next) => {
    try {
        const { id } = req.params; // Get the list ID from URL parameters
        const { name } = req.body; // Get the updated name from request body

        // Find the list by ID and update its name
        const updatedList = await List.findByPk(id);
        if (updatedList) {
            updatedList.name = name; // Set the new name
            await updatedList.save(); // Save the changes to the database
            res.status(200).json({ message: "List name updated successfully", list: updatedList });
        } else {
            res.status(404).json({ message: "List not found" });
        }
    } catch (error) {
        // Handle errors and pass to the error handling middleware
        next(error);
    }
};

exports.getAllListsByUserId = async (req, res, next) => {
    try {

        // Find all lists associated with the user ID
        const allLists = await List.findAll({ where: { user_id: req.userId } });

        if (allLists.length > 0) {
            res.status(200).json({ message: "Lists retrieved successfully", lists: allLists });
        } else {
            res.status(404).json({ message: "No lists found for the user ID" });
        }
    } catch (error) {
        // Handle errors and pass to the error handling middleware
        next(error);
    }
};