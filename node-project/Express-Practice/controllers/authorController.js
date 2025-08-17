const db = require('../db');
const CustomNotFoundError = require('../errors/CustomNotFoundError');

// The controller will call the db to get the data, and send the data back via response.
async function getAuthorById(req, res) {
    const { authorId } = req.params;

    const author = await db.getAuthorById(Number(authorId));
    if (!author) {
        throw new CustomNotFoundError('Author not found');
    }

    res.send(`Author Name: ${author.name}`);
};

module.exports = { getAuthorById };