const pool = require('./pool');
const bcrypt = require('bcryptjs');

async function addUser(firstname, lastname, email, password, isAdmin) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(`INSERT INTO users (firstname, lastname, email, password, isMember, isAdmin, viewCount)
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING id`, 
        [firstname, lastname, email, hashedPassword, false, isAdmin, 1]);

    return rows[0];
}

async function getUserByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1;', [email]);
    return rows[0];
}

async function getUserById(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1;', [id]);
    return rows[0];
}

async function increaseViewCount(id) {
    const { rows } = await pool.query('SELECT * FROM users WHERE id = $1;', [id]);
    const user = rows[0];

    const  { viewcount } = user;
    await pool.query('UPDATE users SET viewcount = $1 WHERE id = $2;', [viewcount+1, id]);
}

async function addMessage(title, text, authorId) {
    await pool.query('INSERT INTO messages (title, text, time, authorId) VALUES ($1, $2, $3, $4);', [title, text, new Date(), authorId]);
}

async function getAllMessages() {
    const sql = `
    SELECT m.*, u.firstname, u.lastname from MESSAGES m
    JOIN users u ON m.authorid = u.id
    `
    const { rows } = await pool.query(sql);
    return rows;
}

async function deleteMessage(id) {
    await pool.query('DELETE FROM messages WHERE id = $1;', [id]);
}

async function addUserToClubById(id) {
    await pool.query('UPDATE users SET ismember = true WHERE id = $1', [id])
}

module.exports = {
    addUser,
    getUserByEmail,
    getUserById,
    increaseViewCount,
    addMessage,
    getAllMessages,
    deleteMessage,
    addUserToClubById,
}