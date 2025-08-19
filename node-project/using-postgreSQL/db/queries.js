const pool = require("./pool");

async function getAllUsernames() {
    const { rows } = await pool.query("SELECT * FROM usernames");
    return rows;
}

async function insertUsername(username) {
    await pool.query("INSERT INTO usernames (username) VALUES ($1)", [username]);
}

async function getUsersBySearchValue(searchValue) {
    const result = await pool.query("SELECT * FROM usernames WHERE username LIKE $1", [`%${searchValue}%`]);
    return result.rows;
}

async function deleteAllUsers() {
    await pool.query("Delete FROM usernames");
}

module.exports = {
    getAllUsernames,
    insertUsername,
    getUsersBySearchValue,
    deleteAllUsers,
};