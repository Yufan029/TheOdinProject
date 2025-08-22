const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");
const itemsController = require("../controllers/itemsController");

const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.inventoryGet);
inventoryRouter.get("/submit", inventoryController.selectedCategoriesGet)
inventoryRouter.get("/newCategory", inventoryController.addCategoryGet);
inventoryRouter.post("/newCategory", inventoryController.addCategoryPost);

inventoryRouter.get("/:id/categoryDetails", inventoryController.categoryDetailsGet);
inventoryRouter.get("/:id/categoryDelete", inventoryController.categoryDeleteGet);
inventoryRouter.get("/:id/categoryUpdate", inventoryController.categoryUpdateGet);
inventoryRouter.post("/:id/categoryUpdate", inventoryController.categoryUpdatePost);

inventoryRouter.get("/newItem", itemsController.itemAddGet);
inventoryRouter.post("/newItem", itemsController.itemAddPost);
inventoryRouter.get("/:id/itemDetails", itemsController.itemDetailsGet);
inventoryRouter.get("/:id/itemUpdate", itemsController.itemUpdateGet);
inventoryRouter.post("/:id/itemUpdate", itemsController.itemUpdatePost);
inventoryRouter.get("/:id/itemDelete", itemsController.itemDeleteGet);

module.exports = inventoryRouter;