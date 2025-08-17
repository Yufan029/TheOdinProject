const express = require("express");

const bookRouter = express.Router();

bookRouter.get('/', (req, res) => res.send("This is books page"));
bookRouter.get('/:bookId', (req, res) => {
    res.send(`Book id is ${req.params.bookId}`);
});
bookRouter.post('/:bookId', (req, res) => res.send(`book post request`));

module.exports = bookRouter;