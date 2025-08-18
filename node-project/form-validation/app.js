const express = require("express");
const usersRouter = require("./routes/usersRouter");

const PORT = process.env.PROT || 3000;

const app = express();

app.set("view engine", "ejs");

// parse the form data into req.body, if extended is false, only accept string and array.
app.use(express.urlencoded({ extended: true }));
app.use("/", usersRouter);

app.listen(PORT, (error) => {
    if (error) {
        throw error;
    }

    console.log(`Express app listening on port ${PORT}`);
});