const pool = require("./pool");

async function getAllCategories() {
    const { rows } = await pool.query("SELECT * FROM Categories ORDER BY name");
    return rows;
}

async function getCategoryById(id) {
    const { rows } = await pool.query("SELECT * FROM Categories WHERE id = $1;", [id]);
    return rows[0];
}

async function findCategoryByName(categoryName) {
    const { rows } = await pool.query("SELECT * FROM Categories WHERE LOWER(name) = $1 LIMIT 1;", [categoryName]);
    return rows[0];
}

async function UpdateCategoryNameById(id, categoryName) {
    await pool.query("UPDATE categories SET name = $1 WHERE id = $2;", [categoryName, id]);
}

async function addCategory(category) {
    await pool.query("INSERT INTO categories (name, time) VALUES ($1, $2);", [category, new Date()]);
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
ORDER BY i.name
`

async function getAllItemsByCategories(categories) {
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

async function deleteItemById(id) {
    await pool.query("DELETE FROM Items WHERE id = $1;", [id]);
}

async function addItem(name, quantity, price, categoryIds) {
    const result = await pool.query("INSERT INTO Items (name, quantity, price, time) VALUES ($1, $2, $3, $4) RETURNING id;", [name, quantity, price, new Date()]);
    const itemId = result.rows[0].id;

    if (categoryIds.length !== 0) {
        categoryIds.map(async id => {
            await pool.query("INSERT INTO ItemCategories (itemId, categoryId) VALUES ($1, $2);", [itemId, id]);
        });
    }
}

async function getItemById(id) {
    const { rows } = await pool.query("SELECT * FROM Items WHERE id = $1;", [id]);
    return rows[0];
}

async function getCategoriesByItemId(itemId) {
    const SQL =`
SELECT c.* FROM categories c
JOIN itemCategories ic ON c.id = ic.categoryId
JOIN items i ON ic.itemId = i.id
WHERE i.id = $1;
    `;

    const { rows } = await pool.query(SQL, [itemId]);
    return rows;
}

async function updateItemById(id, newName, newQuantity, newPrice, category) {
    await pool.query("UPDATE Items SET name=$1, quantity=$2, price=$3 WHERE id = $4;", [newName, newQuantity, newPrice, id]);
    await pool.query("DELETE FROM ItemCategories WHERE itemId = $1", [id]);

    category.map(async categoryId => {
        await pool.query("INSERT INTO ItemCategories (itemId, categoryId) VALUES ($1, $2);", [id, categoryId]);
    });
}

module.exports = {
    getAllCategories,
    getCategoryById,
    getAllItemsByCategories,
    addCategory,
    deleteCategory,
    findCategoryByName,
    UpdateCategoryNameById,
    deleteItemById,
    addItem,
    getItemById,
    getCategoriesByItemId,
    updateItemById,
}