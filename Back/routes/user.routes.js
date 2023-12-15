const { register, login, logout } = require("../controllers/user.controllers.js");
const express = require("express")


const router = express.Router();

router.post("/new", register); // register
router.post("/login", login); // login
router.get("/logout", logout); // logout


module.exports = router