const express = require('express');
const indexRouter = require('./indexRouter');

const PORT = 3000;
const app = express();

app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use('/', indexRouter);

app.listen(PORT, () => {
    console.log('Server running at http://localhost:3000');
});