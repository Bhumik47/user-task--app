const express = require("express");
const { createList, deleteList, updateListName, getAllListsByUserId } = require("../controllers/list.controllers");
const { isAuthenticated } = require("../middlewares/Auth");

const router = express.Router();

router.post("/createlist",isAuthenticated, createList);
router.delete("/deletelist/:id", deleteList);
router.put("/updatelist/:id", updateListName);
router.get("/getlists", isAuthenticated,getAllListsByUserId);


module.exports = router