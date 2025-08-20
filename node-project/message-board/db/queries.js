const pool = require('./pool');

async function getAllMessages() {
    const { rows } = await pool.query('SELECT * FROM messages');
    return rows;
}

async function insertNewMessage(author, message) {
    await pool.query("INSERT INTO messages (author, message, time) VALUES ($1, $2, $3)", 
        [author, message, new Date()]);
}

async function deleteMessage(id) {
    await pool.query("DELETE FROM messages WHERE id=$1", [id]);
}

module.exports = {
    getAllMessages,
    insertNewMessage,
    deleteMessage,
}

