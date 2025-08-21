const { body, validationResult } = require("express-validator");
const db = require("../db/queries");

async function inventoryGet(req, res) {
    const categories = await db.getAllCategories();

    res.render('index', { 
        title: "Inventory",
        categories,
        selected: [],
    });
}

async function categoryDeleteGet(req, res) {
    await db.deleteCategory(req.params.id);
    res.redirect("/");
}

async function categoryUpdateGet(req, res) {
    const category = await db.getCategoryById(req.params.id);
    res.render("updateCategory", {
        title: `Update ${category.name}`,
        category,
    });
}

async function selectedCategoriesGet(req, res) {
    const categories = await db.getAllCategories();
    let selected = [].concat(req.query.category || []);

    console.log("selected categories:", selected);

    const items = await db.getAllItems(selected);    
    console.log("selected items:", items);

    res.render("index", {
        title: "Inventory",
        categories,
        selected,
        items,
    })
}

function addCategoryGet(req, res) {
    res.render("addCategory", {
        title: "Add New Category",
    });
}

const validateCategoryName = [
    body("newCategory")
        .trim()
        .notEmpty().withMessage("Category name cannot be empty.")
        .custom(async (value) => {
            const existing = await db.findCategoryByName(value.toLowerCase());
            if (existing) {
                throw new Error("Category name already exists!");
            }

            return true;
        }),
];

const addCategoryPost = [
    validateCategoryName,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("addCategory", {
                title: "Add New Category",
                errors: errors.array(),
            });
        }
        
        const { newCategory } = req.body;
        await db.addCategory(newCategory);
        return res.redirect("/");
    }
];

const categoryUpdatePost = [
    validateCategoryName,
    async (req, res) => {
        const category = await db.getCategoryById(req.params.id);
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("updateCategory", {
                title: "Update Category",
                errors: errors.array(),
                category,
            });
        }

        await db.UpdateCategoryNameById(req.params.id, req.body.newCategory);
        res.redirect("/");
    }
]

async function categoryDetailsGet(req, res) {
    const { id } = req.params;
    const category = Number(id) === 0 ? { id: 0, name: "No category" } : await db.getCategoryById(id);

    console.log(category);
    res.render("categoryDetails", {
        title: `Category - ${category}`,
        category,
    })
}

module.exports = {
    inventoryGet,
    selectedCategoriesGet,
    categoryDeleteGet,
    addCategoryGet,
    addCategoryPost,
    categoryDetailsGet,
    categoryUpdateGet,
    categoryUpdatePost,
}