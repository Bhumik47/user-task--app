const ErrorHandler = require("../middlewares/error.js");

const { sendCookie } = require("../utilities/feature.js");

const db = require("../models");
const User = db.user;
const bcrypt = require("bcrypt");

exports.register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        let user = await User.findOne({ where: { email } });
        if (user) return next(new ErrorHandler("User Already Exist", 400));

        const hashedPassword = await bcrypt.hash(password, 10);


        user = await User.create({ name, email, password: hashedPassword });

        sendCookie(user, res, "Registered Successfully", 201);
    } catch (error) {
        next(error)
    }
}

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        let user = await User.findOne({ where: { email } });

        if (!user) return next(new ErrorHandler("Invalid Email or Password", 400));

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return next(new ErrorHandler("Invalid Email or Password", 400));

        sendCookie(user, res, `Welcome back, ${user.name}`, 201)

    } catch (error) {
        next(error)
    }
}

exports.logout = (req, res) => {
    res.status(200).cookie("token", "", {
        expires: new Date(Date.now()),
        samesite: process.env.NODE_ENV === "development" ? "lax " : "none",
        // secure: process.env.NODE_ENV === "development" ? false : true,
    }).json({
        success: true,
        user: req.user
    })
}