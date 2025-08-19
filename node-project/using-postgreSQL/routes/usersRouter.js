const { Router } = require("express");
const usersController = require("../controllers/usersController");

const usersRouter = Router();

usersRouter.get("/", usersController.listUsersGet);
usersRouter.get("/new", usersController.newUserGet);
usersRouter.post("/new", usersController.newUserPost);

usersRouter.get("/search", usersController.searchUsers);
usersRouter.get("/delete", usersController.deleteAllUsers);

module.exports = usersRouter;