const { Router } = require("express");
const inventoryController = require("../controllers/inventoryController");

const inventoryRouter = Router();

inventoryRouter.get("/", inventoryController.inventoryGet);
inventoryRouter.get("/submit", inventoryController.selectedCategoriesGet)
inventoryRouter.get("/newCategory", inventoryController.addCategoryGet);
inventoryRouter.post("/newCategory", inventoryController.addCategoryPost);
inventoryRouter.get("/:id/categoryDetails", inventoryController.categoryDetailsGet);
inventoryRouter.get("/:id/categoryDelete", inventoryController.categoryDeleteGet)

module.exports = inventoryRouter;