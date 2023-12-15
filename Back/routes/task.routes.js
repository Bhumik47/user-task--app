const express = require("express");
const { createTask, deleteTaskById, updateTaskDescription, markTaskAsCompleted, getIncompleteTasksByListId, updateTaskListId } = require("../controllers/task.controller");

const router = express.Router();

router.post("/createtask/:list_id", createTask);
router.delete("/deletetask/:task_id", deleteTaskById);
router.put("/updatedesc/:task_id", updateTaskDescription);
router.put("/updatestatus/:task_id", markTaskAsCompleted);
router.post("/gettasks", getIncompleteTasksByListId);
router.put("/updatelistid/:task_id/:new_list_id", updateTaskListId);




module.exports = router