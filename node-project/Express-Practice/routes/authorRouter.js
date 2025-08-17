const { Router } = require("express");
const { getAuthorById } = require("../controllers/authorController");

const authorRouter = Router();

authorRouter.get("/", (req, res) => res.send("All authors"));

// pass the controller to the route.
authorRouter.get("/:authorId", (req, res) => getAuthorById(req, res));

authorRouter.post('/:authorId', (req, res) => res.send(`author post request ${req.url}`));

module.exports = authorRouter;