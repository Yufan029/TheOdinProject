const pool = require("./pool");

async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM Categories ORDER BY name");
    return rows;
}

async function getCategory(id) {
    const { rows } = await pool.query("SELECT * FROM Categories WHERE id = $1;", [id]);
    return rows[0];
}

async function deleteCategory(id) {
    await pool.query("DELETE FROM Categories WHERE id = $1;", [id]);
}

const queryItemsForCategories = `
SELECT DISTINCT i.* FROM Items i
LEFT JOIN ItemCategories ic ON i.id = ic.itemId
LEFT JOIN Categories c ON ic.categoryId = c.id
WHERE 
    ($1::boolean AND c.id IS NULL)
    OR
    (c.id = ANY($2::int[]))
`

async function getAllItems(categories) {
    let includeNoCategory = false;
    let selectedCategoryIds = [];

    if (categories.includes("No Category")) {
        includeNoCategory = true;
        selectedCategoryIds = categories.filter(category => category != "No Category").map(Number);
    } else {
        selectedCategoryIds = categories.map(Number);
    }
    
    const { rows } = await pool.query(queryItemsForCategories, [includeNoCategory, selectedCategoryIds]);
    return rows;
}

async function addCategory(category) {
    await pool.query("INSERT INTO categories (name, time) VALUES ($1, $2);", [category, new Date()]);
}

module.exports = {
    getAllCategories,
    getCategory,
    getAllItems,
    addCategory,
    deleteCategory,
}