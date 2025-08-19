// Put this in the first line, make sure all the other file can access process environment values.
require('dotenv').config();

const express = require("express");
const usersRouter = require("./routes/usersRouter");

const PORT = process.env.PORT || 3000;

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", usersRouter)

app.listen(PORT, () => {
    console.log(`The application is running on port: ${PORT}`);
});