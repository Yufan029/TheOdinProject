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

async function addCategoryPost(req, res) {
    const { newCategory } = req.body;
    await db.addCategory(newCategory);
    console.log(44);
    res.redirect("/");
}

async function categoryDetailsGet(req, res) {
    const { id } = req.params;
    const category = Number(id) === 0 ? { id: 0, name: "No category", time:"N/A" } : await db.getCategory(id);

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
}