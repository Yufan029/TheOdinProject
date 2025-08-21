require("dotenv").config();

const path = require("node:path");
const express = require("express")
const inventoryRouter = require("./routes/inventoryRouter");
const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, "assets")));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", inventoryRouter);

app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
})