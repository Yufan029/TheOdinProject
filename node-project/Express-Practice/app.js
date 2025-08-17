const express = require('express');
const authorRouter = require('./routes/authorRouter');
const bookRouter = require('./routes/bookRouter');
const indexRouter = require('./routes/indexRouter');
const path = require('node:path');
const db = require('./db');

const app = express();

app.set("view engine", "ejs");
// can omit below line, seems use views folder as default value is process.cwd() + '/views'
app.set("views", path.join(__dirname, "views"));

app.use(express.static(db.assetsPath));

// new routers like mini-app, has its own use, middleware, handler, error handler etc.
app.use('/authors', authorRouter);
app.use('/books', bookRouter);

// app.get('/', (req, res) => {
//     // if you specify the extension of the file, then even view engine can be omit!
//     res.render("index.ejs", { links: db.links, users: db.users });
// });

app.get('/', (req, res) => {
    res.render('pages/index', { users: db.users, title: 'Pages' });
});

app.get('/articles', (req, res) => {
    res.render('pages/articles', { articles: db.articles, title: 'Articles' });
});

app.get('/about', (req, res) => {
    res.render('pages/about', { title: 'About', users: db.users });
})

//app.use('/', indexRouter);

// Error handling middleware function, only this one have 4 parameters
app.use((err, req, res, next) => {
    console.error(err);
    res.status(res.statusCode || 500).send(err);
});

const PORT = 3000;

app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }

    console.log(`My first Express app -listening on port ${PORT}!`);
});