const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const { config } = require("dotenv");
const db = require("./models");
const userRouter = require("./routes/user.routes.js")
const listRouter = require("./routes/list.routes.js");
const taskRouter = require("./routes/task.routes.js");




const app = express();
 
//db connection 
(async () => {
    try {
        await db.sequelize.sync();
        console.log("Database synced successfully.");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
})();

// env setup 

config({
    path: "./.env"
})


//middlewares
app.use(cookieParser());

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

//using routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/lists", listRouter);
app.use("/api/v1/tasks", taskRouter);


app.listen(process.env.PORT, () => {
    console.log(`server is running on port ${process.env.PORT} in ${process.env.NODE_ENV} Mode`)
});