const db = require("../db/queries");
const { body, validationResult } = require("express-validator");

async function itemDeleteGet(req, res) {
    await db.deleteItemById(req.params.id);
    const selected = req.query.selected ? req.query.selected.split(',') : [];
    const categories = await db.getAllCategories();
    const items = await db.getAllItemsByCategories(selected);

    res.render("index", {
        title: "Inventory",
        categories,
        selected,
        items,
    })
}

async function itemAddGet(req, res) {
    const categories = await db.getAllCategories();

    res.render("addNewItem", {
        title: "Add new item",
        categories,
    });
}

const validateNewItem = [
    body("itemName")
        .trim()
        .notEmpty().withMessage("Item's name cannot be empty."),
];

const itemAddPost = [
    validateNewItem,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            const categories = await db.getAllCategories();
            return res.status(400).render("addNewItem", {
                title: "Add New Category",
                errors: errors.array(),
                categories
            });
        }

        const { itemName, itemQuantity, itemPrice, category } = req.body;
        await db.addItem(itemName, itemQuantity, itemPrice, category !== undefined ? [...category] : []);
        res.redirect("/");
    }
]

async function itemDetailsGet(req, res) {
    const { id } = req.params;
    const item = await db.getItemById(id);

    const categories = await db.getCategoriesByItemId(item.id);
    console.log(categories);

    res.render("itemDetails", {
        title: `${item.name} details`,
        item,
        categories,
    })
}

async function itemUpdateGet(req, res) {
    const item = await db.getItemById(req.params.id);
    const categories = await db.getAllCategories();
    const selectedCategories = await db.getCategoriesByItemId(item.id);
    const selectedCategoyIds = [];
    if (selectedCategories && selectedCategories.length > 0) {
        selectedCategories.map(category => selectedCategoyIds.push(category.id));
    }

    console.log(item);
    console.log(selectedCategoyIds);
    res.render("updateItem", {
        title: "Update item",
        item,
        categories,
        selectedCategoyIds,
    });
}

const itemUpdatePost = [
    validateNewItem,
    async (req, res) => {
        const errors = validationResult(req);
        const item = await db.getItemById(req.params.id);
        const categories = await db.getAllCategories();
        const { itemName, newQuantity, newPrice, category } = req.body;

        if (!errors.isEmpty()) {
            return res.status(400).render("updateItem", {
                title: "Update item",
                item,
                categories,
                selectedCategoyIds: category || [],
                errors: errors.array(),
            })
        }

        const { id } = req.params;
        console.log(req.body);
        await db.updateItemById(id, itemName, newQuantity, newPrice, category !== undefined ? category : []);

        res.redirect("/");
    }
];

module.exports = {
    itemDeleteGet,
    itemAddGet,
    itemAddPost,
    itemDetailsGet,
    itemUpdateGet,
    itemUpdatePost,
}