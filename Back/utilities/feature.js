const jwt = require("jsonwebtoken");

exports.sendCookie = (user, res, message, statusCode = 200) => {

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    const oneDayInSeconds = 24 * 60 * 60; // 1 day in seconds
    const oneDayInMilliseconds = oneDayInSeconds * 1000; // convert to milliseconds

    res.status(statusCode).cookie("token", token, {
        // httpOnly: true,
        maxAge: oneDayInMilliseconds,
        samesite: process.env.NODE_ENV === "development" ? "lax " : "none",
        // secure: process.env.NODE_ENV === "development" ? false : true,
    }).json({
        success: true,
        message,
        username:user.name
    });
}