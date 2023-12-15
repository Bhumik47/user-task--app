const db = require("../models");
const Task = db.task;

exports.createTask = async (req, res, next) => {
    try {
        const { list_id } = req.params; // Get the list ID from URL parameters
        const { description } = req.body; // Get task details from request body

        // Create a new task associated with the specified list
        const newTask = await Task.create({
            description: description,
            list_id: list_id
        });

        res.status(200).json({ message: "Task created successfully", task: newTask });
    } catch (error) {
        // Handle errors and pass to the error handling middleware
        next(error);
    }
};


exports.deleteTaskById = async (req, res, next) => {
    try {
        const { task_id } = req.params; // Get the task ID from URL parameters

        // Find the task by ID and delete it
        const deletedTask = await Task.destroy({ where: { id: task_id } });

        if (deletedTask === 1) {
            res.status(200).json({ message: "Task deleted successfully" });
        } else {
            res.status(404).json({ message: "Task not found or already deleted" });
        }
    } catch (error) {
        // Handle errors and pass to the error handling middleware
        next(error);
    }
};


exports.updateTaskDescription = async (req, res, next) => {
    try {
        const { task_id } = req.params; // Get the task ID from URL parameters
        const { description } = req.body; // Get the updated description from request body

        // Find the task by ID and update its description
        const updatedTask = await Task.findByPk(task_id);
        if (updatedTask) {
            updatedTask.description = description; // Set the new description
            await updatedTask.save(); // Save the changes to the database
            res.status(200).json({ message: "Task description updated successfully", task: updatedTask });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        // Handle errors and pass to the error handling middleware
        next(error);
    }
};

exports.markTaskAsCompleted = async (req, res, next) => {
    try {
        const { task_id } = req.params; // Get the task ID from URL parameters

        // Find the task by ID and update its isCompleted value to true
        const updatedTask = await Task.findByPk(task_id);
        if (updatedTask) {
            updatedTask.isCompleted = true; // Set isCompleted to true
            await updatedTask.save(); // Save the changes to the database
            res.status(200).json({ message: "Task marked as completed", task: updatedTask });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        // Handle errors and pass to the error handling middleware
        next(error);
    }
};

exports.getIncompleteTasksByListId = async (req, res, next) => {
    try {
        const { listsId } = req.body; // Get the list ID from URL parameters

        // Find all tasks by list_id where isCompleted is false
        const incompleteTasks = await Task.findAll({
            where: {
                list_id: listsId,
                isCompleted: false
            }
        });

        res.status(200).json({ message: "Incomplete tasks retrieved successfully", tasks: incompleteTasks });
    } catch (error) {
        // Handle errors and pass to the error handling middleware
        next(error);
    }
};


exports.updateTaskListId = async (req, res, next) => {
    try {
        const { task_id, new_list_id } = req.params; // Get task ID and new list ID from URL parameters

        // Find the task by ID and update its list_id
        const updatedTask = await Task.findByPk(task_id);
        if (updatedTask) {
            updatedTask.list_id = new_list_id; // Update the list_id with the new_list_id
            await updatedTask.save(); // Save the changes to the database
            res.status(200).json({ message: "Task list_id updated successfully", task: updatedTask });
        } else {
            res.status(404).json({ message: "Task not found" });
        }
    } catch (error) {
        // Handle errors and pass to the error handling middleware
        next(error);
    }
};