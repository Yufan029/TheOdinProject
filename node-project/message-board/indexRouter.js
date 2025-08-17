const express = require('express');

const messages = [
    {
        text: "Hi there!",
        user: "Amando",
        added: new Date()
    },
    {
        text: "Hello World!",
        user: "Charles",
        added: new Date()
    }
]

const indexRouter = express.Router();

indexRouter.get('/', (req, res) => res.render('index', { title: "Mini Message Board", messages }));
indexRouter.get('/new', (req, res) => res.render('form', { title: "New Message" }));

indexRouter.post('/new', (req, res) => {
    messages.push({
        user: req.body.author,
        text: req.body.message,
        added: new Date(),
    });

    res.redirect('/');
});

indexRouter.get('/details', (req, res) => {
    console.log(req.query);
    res.render('details', { title: "Details", details: req.query })
});

module.exports = indexRouter;