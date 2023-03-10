const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const app = express();

const dbConnect= require("./config/dbConfig")
const userRouter = require("./route/user/UserRouter")

app.use(express.json());
app.use(cors({origin:"*"}));


app.use("/api/user",userRouter);


const PORT=process.env.PORT||5000;
app.listen(PORT,console.log(`server is running at ${PORT}`));











